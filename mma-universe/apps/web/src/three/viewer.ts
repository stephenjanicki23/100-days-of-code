/**
 * The viewer: a timeline in, pixels out.
 *
 * Kept as a plain class rather than a React component on purpose. React owns the HUD and the
 * transport controls; this owns the render loop, and the two meet at `load`, `seek` and an
 * `onFrame` callback. Nothing in here knows what a fight is — it draws whatever
 * `sampleFrame` returns.
 */

import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import type { Frame, Timeline } from './player.ts';
import { sampleFrame } from './player.ts';
import { FighterModel, PALETTE_A, PALETTE_B } from './skeleton.ts';
import { CAMERA_LEASH, CAMERA_PRESETS, buildArena, buildLighting } from './scene.ts';
import type { Arena } from './scene.ts';

export interface ViewerOptions {
  /** Called after every rendered frame, for the HUD. */
  readonly onFrame?: (frame: Frame) => void;
  /** Called once if WebGL is unavailable, so the page can say so rather than sit blank. */
  readonly onError?: (message: string) => void;
}

export class FightViewer {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(40, 16 / 9, 0.1, 120);
  private readonly arena: Arena;
  private readonly disposeLighting: () => void;
  private readonly fighterA = new FighterModel(PALETTE_A);
  private readonly fighterB = new FighterModel(PALETTE_B);
  private readonly cameraTarget = new THREE.Vector3(0, 1.2, 0);
  private readonly desiredPosition = new THREE.Vector3();
  private readonly desiredTarget = new THREE.Vector3();
  private readonly observer: ResizeObserver;
  private readonly composer: EffectComposer;
  private readonly bloom: UnrealBloomPass;
  private readonly environment: THREE.Texture;

  private timeline?: Timeline;
  private raf = 0;
  private lastTick = 0;
  private lastWidth = 0;
  private lastHeight = 0;
  private time = 0;
  private rate = 1;
  private running = false;
  private disposed = false;

  constructor(
    private readonly container: HTMLElement,
    private readonly options: ViewerOptions = {},
  ) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x05070b, 1);
    /**
     * Filmic tone mapping rather than the linear default.
     *
     * Untonemapped output is the single loudest tell of a synthetic render: highlights clip to
     * flat white and everything below them sits in a narrow band, which is exactly why the
     * first pass looked like moulded plastic. ACES rolls the highlights off the way a camera
     * does, so a bright light on skin reads as a bright light rather than as a hole.
     */
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.72;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';

    this.scene.fog = new THREE.Fog(0x05070b, 10, 26);

    /**
     * Image-based lighting, generated rather than downloaded.
     *
     * Punctual lights alone leave everything they do not hit perfectly black, which no real
     * room does — surfaces pick up bounce from every direction. `RoomEnvironment` is a crude
     * box of emitters that three.js pre-filters into an environment map, and it is the single
     * biggest step from "shaded primitives" toward "photographed object", because it is what
     * gives a material something to reflect.
     */
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environment = this.environment;
    this.scene.environmentIntensity = 0.16;
    pmrem.dispose();

    this.arena = buildArena();
    this.scene.add(this.arena.group);
    this.disposeLighting = buildLighting(this.scene);
    this.scene.add(this.fighterA.root, this.fighterB.root);

    // A little bloom on the cage lights, then antialiasing, then tone mapping and colour
    // conversion last — OutputPass reads the renderer's settings, so it must close the chain.
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.22, 0.7, 0.92);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new SMAAPass());
    this.composer.addPass(new OutputPass());

    this.camera.position.set(2.9, 2.5, 4.6);
    this.camera.lookAt(this.cameraTarget);

    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(container);
    this.resize();
  }

  private resize(): void {
    const width = Math.max(this.container.clientWidth, 1);
    const height = Math.max(this.container.clientHeight, 1);
    this.lastWidth = width;
    this.lastHeight = height;
    this.renderer.setSize(width, height, false);
    this.composer?.setSize(width, height);
    this.bloom?.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  load(timeline: Timeline): void {
    this.timeline = timeline;
    this.time = 0;
    this.renderAt(0, true);
  }

  get duration(): number {
    return this.timeline?.duration ?? 0;
  }

  get currentTime(): number {
    return this.time;
  }

  get isPlaying(): boolean {
    return this.running;
  }

  setRate(rate: number): void {
    this.rate = rate;
  }

  seek(time: number): void {
    this.time = Math.max(0, Math.min(time, this.duration));
    this.renderAt(this.time, true);
  }

  play(): void {
    if (this.running || this.disposed) return;
    if (this.time >= this.duration) this.time = 0;
    this.running = true;
    this.lastTick = performance.now();
    const step = (now: number) => {
      if (!this.running) return;
      const delta = Math.min((now - this.lastTick) / 1000, 0.1);
      this.lastTick = now;
      this.time += delta * this.rate;
      if (this.time >= this.duration) {
        this.time = this.duration;
        this.running = false;
      }
      this.renderAt(this.time, false, delta);
      if (this.running) this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }

  pause(): void {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  /**
   * Renders one frame.
   *
   * `snapCamera` exists for seeking and for screenshots: the camera normally damps toward its
   * preset, which is state, and a test that asserts on a frame must not depend on how the
   * viewer arrived at it.
   */
  renderAt(time: number, snapCamera = false, delta = 0): void {
    if (this.disposed || !this.timeline) return;
    // A ResizeObserver can measure before an aspect-ratio box has resolved, which leaves the
    // drawing buffer a different shape from the element and letterboxes the render inside
    // itself. Cheap to re-check every frame; the setter is a no-op when nothing moved.
    if (
      this.renderer.domElement.clientWidth !== this.lastWidth ||
      this.renderer.domElement.clientHeight !== this.lastHeight
    ) {
      this.resize();
    }
    const frame = sampleFrame(this.timeline, time);

    this.fighterA.applyPose(frame.a.pose);
    this.fighterA.setPlacement(frame.a.position, frame.a.yaw);
    this.fighterB.applyPose(frame.b.pose);
    this.fighterB.setPlacement(frame.b.position, frame.b.yaw);

    const preset = CAMERA_PRESETS[frame.camera] ?? CAMERA_PRESETS.BROADCAST;
    const centreX = (frame.a.position[0] + frame.b.position[0]) / 2;
    const centreZ = (frame.a.position[2] + frame.b.position[2]) / 2;
    this.desiredPosition.set(centreX + preset.offset[0], preset.offset[1], centreZ + preset.offset[2]);
    // Keep the lens inside the fence; a post in the foreground ruins any framing.
    const reach = Math.hypot(this.desiredPosition.x, this.desiredPosition.z);
    if (reach > CAMERA_LEASH) {
      this.desiredPosition.x *= CAMERA_LEASH / reach;
      this.desiredPosition.z *= CAMERA_LEASH / reach;
    }
    this.desiredTarget.set(centreX, preset.lookHeight, centreZ);

    /**
     * A little handheld float.
     *
     * A camera on a perfect spline reads as CAD, not as coverage — the eye notices the absence
     * of an operator. Three incommensurate low frequencies at a few centimetres are enough to
     * suggest one, and because they are a function of the timeline clock rather than of a
     * random source, a paused frame is stable and a replay is identical.
     */
    const float = time;
    this.desiredPosition.x += Math.sin(float * 0.53) * 0.035 + Math.sin(float * 1.31) * 0.012;
    this.desiredPosition.y += Math.sin(float * 0.71 + 1.4) * 0.022;
    this.desiredPosition.z += Math.sin(float * 0.43 + 2.6) * 0.03;
    this.desiredTarget.y += Math.sin(float * 0.61 + 0.8) * 0.012;

    if (snapCamera) {
      this.camera.position.copy(this.desiredPosition);
      this.cameraTarget.copy(this.desiredTarget);
      this.camera.fov = preset.fov;
    } else {
      const damping = 1 - Math.exp(-6 * delta);
      this.camera.position.lerp(this.desiredPosition, damping);
      this.cameraTarget.lerp(this.desiredTarget, damping);
      this.camera.fov += (preset.fov - this.camera.fov) * damping;
    }
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(this.cameraTarget);

    this.composer.render();
    this.options.onFrame?.(frame);
  }

  dispose(): void {
    this.pause();
    this.disposed = true;
    this.observer.disconnect();
    this.disposeLighting();
    this.arena.dispose();
    this.fighterA.dispose();
    this.fighterB.dispose();
    this.environment.dispose();
    this.composer.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}

/** Constructs a viewer, reporting rather than throwing when the browser has no WebGL. */
export function createViewer(container: HTMLElement, options: ViewerOptions = {}): FightViewer | undefined {
  try {
    return new FightViewer(container, options);
  } catch (cause) {
    options.onError?.(cause instanceof Error ? cause.message : String(cause));
    return undefined;
  }
}
