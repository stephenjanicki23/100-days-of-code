"""
Path-traced renderer for a fight.

A second consumer of the same data the browser viewer reads. This script has no knowledge of
the simulation, the fight engine, or even the event contract — it is handed bind-pose meshes,
a bone hierarchy and per-frame rotations by `export-render.ts`, and it renders them. That the
same fight can be drawn by two renderers with nothing in common is the point.

Why offline: real subsurface scattering, global illumination and soft area shadows are not
available in real time on an integrated GPU. They are entirely available if the frames are
rendered once, on a CPU, and played back as video.

Usage:
    python3 tools/render_blender.py <render.json> <out-dir> [--samples N] [--width W]
"""

from __future__ import annotations

import json
import math
import os
import sys
import time

import bpy
import numpy as np
from mathutils import Vector


# --------------------------------------------------------------------------- helpers

def srgb_to_linear(hex_colour: int) -> tuple[float, float, float, float]:
    """Blender works in linear light; the palette is authored in sRGB."""
    out = []
    for shift in (16, 8, 0):
        channel = ((hex_colour >> shift) & 0xFF) / 255.0
        out.append(channel / 12.92 if channel <= 0.04045 else ((channel + 0.055) / 1.055) ** 2.4)
    return (out[0], out[1], out[2], 1.0)


def to_blender(x: float, y: float, z: float) -> tuple[float, float, float]:
    """three.js is Y-up with +Z forward; Blender is Z-up with -Y forward."""
    return (x, -z, y)


def set_input(node, names, value) -> None:
    """Principled BSDF socket names move between Blender releases; try each in turn."""
    for name in names:
        socket = node.inputs.get(name)
        if socket is not None:
            socket.default_value = value
            return


def euler_matrix(rx: float, ry: float, rz: float) -> np.ndarray:
    """XYZ euler exactly as three.js composes it, so the poses agree with the browser."""
    cx, sx = math.cos(rx), math.sin(rx)
    cy, sy = math.cos(ry), math.sin(ry)
    cz, sz = math.cos(rz), math.sin(rz)
    mx = np.array([[1, 0, 0], [0, cx, -sx], [0, sx, cx]])
    my = np.array([[cy, 0, sy], [0, 1, 0], [-sy, 0, cy]])
    mz = np.array([[cz, -sz, 0], [sz, cz, 0], [0, 0, 1]])
    return mx @ my @ mz


# ------------------------------------------------------------------------- skinning

class Rig:
    """Linear blend skinning, done here so the exported file stays small."""

    def __init__(self, rig: list[dict]):
        self.parents = [bone['parent'] for bone in rig]
        self.offsets = np.array([bone['offset'] for bone in rig], dtype=float)
        self.rest = np.zeros_like(self.offsets)
        for index, parent in enumerate(self.parents):
            self.rest[index] = self.offsets[index] + (self.rest[parent] if parent >= 0 else 0)

    def skin_matrices(self, rotations: list[list[float]], hip_offset: list[float]) -> np.ndarray:
        """One 4x4 per bone, mapping a bind-pose vertex to its posed position."""
        count = len(self.parents)
        world = np.zeros((count, 4, 4))
        for index, parent in enumerate(self.parents):
            local = np.eye(4)
            local[:3, :3] = euler_matrix(*rotations[index])
            translation = self.offsets[index].copy()
            if index == 0:  # the hips carry the pose's own displacement
                translation = translation + np.array(hip_offset)
            local[:3, 3] = translation
            world[index] = (world[parent] @ local) if parent >= 0 else local

        skin = np.zeros((count, 4, 4))
        for index in range(count):
            bind_inverse = np.eye(4)
            bind_inverse[:3, 3] = -self.rest[index]
            skin[index] = world[index] @ bind_inverse
        return skin


def deform(positions: np.ndarray, indices: np.ndarray, weights: np.ndarray, skin: np.ndarray) -> np.ndarray:
    homogeneous = np.concatenate([positions, np.ones((len(positions), 1))], axis=1)
    out = np.zeros((len(positions), 3))
    for slot in range(2):  # the generator never uses more than two influences
        matrices = skin[indices[:, slot]]
        contribution = np.einsum('nij,nj->ni', matrices, homogeneous)[:, :3]
        out += contribution * weights[:, slot : slot + 1]
    return out


def place(points: np.ndarray, root: list[float], yaw: float) -> np.ndarray:
    cos, sin = math.cos(yaw), math.sin(yaw)
    rotated = np.stack(
        [points[:, 0] * cos + points[:, 2] * sin, points[:, 1], -points[:, 0] * sin + points[:, 2] * cos],
        axis=1,
    )
    return rotated + np.array(root)


# ---------------------------------------------------------------------------- scene

def clear_scene() -> None:
    bpy.ops.wm.read_factory_settings(use_empty=True)


def make_material(name: str, palette: dict, kind: str):
    material = bpy.data.materials.new(f'{name}_{kind}')
    material.use_nodes = True
    bsdf = material.node_tree.nodes['Principled BSDF']

    if kind == 'skin':
        set_input(bsdf, ['Base Color'], srgb_to_linear(palette['skin']))
        set_input(bsdf, ['Roughness'], 0.52)
        # The reason this pipeline exists: real scattering, not a screen-space approximation.
        set_input(bsdf, ['Subsurface Weight', 'Subsurface'], 0.2)
        set_input(bsdf, ['Subsurface Radius'], Vector((0.012, 0.005, 0.003)))
        set_input(bsdf, ['Subsurface Scale'], 0.02)
        set_input(bsdf, ['Specular IOR Level', 'Specular'], 0.42)
        set_input(bsdf, ['Coat Weight', 'Clearcoat'], 0.12)
        set_input(bsdf, ['Coat Roughness', 'Clearcoat Roughness'], 0.35)

        # Pore-scale detail, generated rather than downloaded.
        nodes = material.node_tree.nodes
        links = material.node_tree.links
        noise = nodes.new('ShaderNodeTexNoise')
        noise.inputs['Scale'].default_value = 220.0
        noise.inputs['Detail'].default_value = 6.0
        bump = nodes.new('ShaderNodeBump')
        bump.inputs['Strength'].default_value = 0.12
        bump.inputs['Distance'].default_value = 0.0016
        links.new(noise.outputs['Fac'], bump.inputs['Height'])
        links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])
    elif kind == 'trunks':
        set_input(bsdf, ['Base Color'], srgb_to_linear(palette['trunks']))
        set_input(bsdf, ['Roughness'], 0.86)
        set_input(bsdf, ['Sheen Weight', 'Sheen'], 0.35)
    elif kind == 'gloves':
        set_input(bsdf, ['Base Color'], srgb_to_linear(palette['gloves']))
        set_input(bsdf, ['Roughness'], 0.36)
        set_input(bsdf, ['Coat Weight', 'Clearcoat'], 0.45)
    elif kind == 'hair':
        set_input(bsdf, ['Base Color'], srgb_to_linear(palette['hair']))
        set_input(bsdf, ['Roughness'], 0.72)
    else:  # eyes
        set_input(bsdf, ['Base Color'], srgb_to_linear(0x120D0A))
        set_input(bsdf, ['Roughness'], 0.18)
        set_input(bsdf, ['Coat Weight', 'Clearcoat'], 0.6)
    return material


def build_arena() -> None:
    radius = 4.55
    corners = [
        (math.cos(i / 8 * math.tau + math.pi / 8) * radius, math.sin(i / 8 * math.tau + math.pi / 8) * radius)
        for i in range(8)
    ]

    mesh = bpy.data.meshes.new('canvas')
    mesh.from_pydata([(x, y, 0.0) for x, y in corners], [], [list(range(8))])
    canvas = bpy.data.objects.new('canvas', mesh)
    bpy.context.scene.collection.objects.link(canvas)

    material = bpy.data.materials.new('canvas')
    material.use_nodes = True
    bsdf = material.node_tree.nodes['Principled BSDF']
    set_input(bsdf, ['Base Color'], srgb_to_linear(0x5A6069))
    set_input(bsdf, ['Roughness'], 0.88)
    nodes, links = material.node_tree.nodes, material.node_tree.links
    noise = nodes.new('ShaderNodeTexNoise')
    noise.inputs['Scale'].default_value = 90.0
    bump = nodes.new('ShaderNodeBump')
    bump.inputs['Strength'].default_value = 0.25
    bump.inputs['Distance'].default_value = 0.004
    links.new(noise.outputs['Fac'], bump.inputs['Height'])
    links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])
    canvas.data.materials.append(material)

    post_material = bpy.data.materials.new('post')
    post_material.use_nodes = True
    post_bsdf = post_material.node_tree.nodes['Principled BSDF']
    set_input(post_bsdf, ['Base Color'], srgb_to_linear(0x22262E))
    set_input(post_bsdf, ['Metallic'], 0.65)
    set_input(post_bsdf, ['Roughness'], 0.32)

    for x, y in corners:
        bpy.ops.mesh.primitive_cylinder_add(radius=0.075, depth=1.99, location=(x, y, 0.995))
        bpy.context.object.data.materials.append(post_material)

    # A platform under the canvas, so the cage does not float in the dark.
    bpy.ops.mesh.primitive_cylinder_add(radius=radius + 1.2, depth=0.9, vertices=8, location=(0, 0, -0.46))
    apron = bpy.context.object
    apron.rotation_euler = (0, 0, math.pi / 8)
    apron_material = bpy.data.materials.new('apron')
    apron_material.use_nodes = True
    set_input(apron_material.node_tree.nodes['Principled BSDF'], ['Base Color'], srgb_to_linear(0x0D1015))
    set_input(apron_material.node_tree.nodes['Principled BSDF'], ['Roughness'], 0.9)
    apron.data.materials.append(apron_material)

    # The fence, as actual wire. The first attempt was an alpha-cut plane, which rendered as a
    # solid grey panel and was the single worst thing in the frame; chain link is cheap enough
    # to model properly as a bevelled curve, and then it catches light like metal.
    curve = bpy.data.curves.new('fence', type='CURVE')
    curve.dimensions = '3D'
    curve.bevel_depth = 0.0045
    curve.bevel_resolution = 1

    def polyline(points):
        spline = curve.splines.new('POLY')
        spline.points.add(len(points) - 1)
        for index, (px, py, pz) in enumerate(points):
            spline.points[index].co = (px, py, pz, 1.0)

    height = 1.9
    for index in range(8):
        ax, ay = corners[index]
        bx, by = corners[(index + 1) % 8]
        steps = 11
        bands = 6
        for step in range(steps + 1):
            t = step / steps
            x = ax + (bx - ax) * t
            y = ay + (by - ay) * t
            polyline([(x, y, 0.05), (x, y, height)])
            if step < steps:
                nt = (step + 1) / steps
                nx = ax + (bx - ax) * nt
                ny = ay + (by - ay) * nt
                for band in range(bands):
                    z0 = 0.05 + (height - 0.05) * band / bands
                    z1 = 0.05 + (height - 0.05) * (band + 1) / bands
                    polyline([(x, y, z0), (nx, ny, z1)])
                    polyline([(x, y, z1), (nx, ny, z0)])
        for z in (0.05, height):
            polyline([(ax, ay, z), (bx, by, z)])

    fence = bpy.data.objects.new('fence', curve)
    bpy.context.scene.collection.objects.link(fence)
    fence_material = bpy.data.materials.new('fence')
    fence_material.use_nodes = True
    fence_bsdf = fence_material.node_tree.nodes['Principled BSDF']
    set_input(fence_bsdf, ['Base Color'], srgb_to_linear(0x6E7684))
    set_input(fence_bsdf, ['Metallic'], 0.85)
    set_input(fence_bsdf, ['Roughness'], 0.38)
    fence.data.materials.append(fence_material)


def build_lighting() -> None:
    world = bpy.data.worlds.new('arena')
    world.use_nodes = True
    world.node_tree.nodes['Background'].inputs['Color'].default_value = (0.010, 0.013, 0.020, 1.0)
    world.node_tree.nodes['Background'].inputs['Strength'].default_value = 1.0
    bpy.context.scene.world = world

    # A key with real authority, then fill well below it. Four equal overhead sources light
    # everything and model nothing — the first pass looked like a product shot for that reason.
    key = bpy.data.lights.new('key', type='AREA')
    key.energy = 2300
    key.size = 2.2
    key_obj = bpy.data.objects.new('key', key)
    key_obj.location = (2.4, -3.0, 6.2)
    key_obj.rotation_euler = (math.radians(28), 0, math.radians(38))
    bpy.context.scene.collection.objects.link(key_obj)

    for x, y, energy in ((-3.0, -2.6, 300), (-2.8, 2.8, 260), (3.0, 2.6, 230)):
        light = bpy.data.lights.new('bank', type='AREA')
        light.energy = energy
        light.size = 2.6
        obj = bpy.data.objects.new('bank', light)
        obj.location = (x, y, 6.2)
        bpy.context.scene.collection.objects.link(obj)

    # A cool kicker from behind: what separates a body from a black background on camera.
    rim = bpy.data.lights.new('rim', type='AREA')
    rim.energy = 1500
    rim.size = 2.4
    rim.color = (0.58, 0.72, 1.0)
    rim_obj = bpy.data.objects.new('rim', rim)
    rim_obj.location = (-4.2, 4.2, 2.9)
    rim_obj.rotation_euler = (math.radians(72), 0, math.radians(-135))
    bpy.context.scene.collection.objects.link(rim_obj)


def build_fighter(index: int, meshes: list[dict], palette: dict) -> list:
    objects = []
    for part in meshes:
        positions = np.array(part['positions'], dtype=float).reshape(-1, 3)
        faces = np.array(part['indices'], dtype=int).reshape(-1, 3)
        mesh = bpy.data.meshes.new(f'f{index}_{part["material"]}')
        mesh.from_pydata([to_blender(*p) for p in positions], [], faces.tolist())
        mesh.validate()
        obj = bpy.data.objects.new(mesh.name, mesh)
        bpy.context.scene.collection.objects.link(obj)
        obj.data.materials.append(make_material(f'f{index}', palette, part['material']))
        for polygon in mesh.polygons:
            polygon.use_smooth = True
        objects.append(
            {
                'object': obj,
                'mesh': mesh,
                'bind': positions,
                'skinIndices': np.array(part['skinIndices'], dtype=int).reshape(-1, 4),
                'skinWeights': np.array(part['skinWeights'], dtype=float).reshape(-1, 4),
            }
        )
    return objects


def main() -> None:
    payload_path, out_dir = sys.argv[1], sys.argv[2]
    samples = 96
    width = 1280
    for i, arg in enumerate(sys.argv):
        if arg == '--samples':
            samples = int(sys.argv[i + 1])
        if arg == '--width':
            width = int(sys.argv[i + 1])

    with open(payload_path) as handle:
        payload = json.load(handle)

    os.makedirs(out_dir, exist_ok=True)
    clear_scene()

    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'
    scene.cycles.samples = samples
    scene.cycles.use_denoising = True
    scene.cycles.max_bounces = 6
    scene.cycles.caustics_reflective = False
    scene.cycles.caustics_refractive = False
    scene.render.resolution_x = width
    scene.render.resolution_y = int(width * 9 / 16)
    scene.render.film_transparent = False
    # AgX is deliberately flat so it can be graded, and ungraded it renders everything pastel.
    # The named "looks" that would add contrast are not reliably present — this build reports
    # only NONE — so the grade is applied explicitly as a curve, which is version-proof.
    view = scene.view_settings
    view.view_transform = 'AgX'
    view.exposure = -0.45
    view.use_curve_mapping = True
    combined = view.curve_mapping.curves[3]
    combined.points[0].location = (0.0, 0.0)
    combined.points[1].location = (1.0, 1.0)
    combined.points.new(0.22, 0.12)
    combined.points.new(0.76, 0.88)
    view.curve_mapping.update()

    build_arena()
    build_lighting()

    rig = Rig(payload['rig'])
    fighters = [build_fighter(i, payload['meshes'][i], payload['palettes'][i]) for i in range(2)]

    camera_data = bpy.data.cameras.new('camera')
    camera_data.sensor_fit = 'VERTICAL'
    camera_data.dof.use_dof = True
    camera_data.dof.aperture_fstop = 2.8
    camera = bpy.data.objects.new('camera', camera_data)
    scene.collection.objects.link(camera)
    scene.camera = camera

    target = bpy.data.objects.new('focus', None)
    scene.collection.objects.link(target)
    constraint = camera.constraints.new('TRACK_TO')
    constraint.target = target
    constraint.track_axis = 'TRACK_NEGATIVE_Z'
    constraint.up_axis = 'UP_Y'
    camera_data.dof.focus_object = target

    for number, frame in enumerate(payload['frames']):
        for index, parts in enumerate(fighters):
            pose = frame['fighters'][index]
            skin = rig.skin_matrices(pose['rotations'], pose['offset'])
            for part in parts:
                posed = deform(part['bind'], part['skinIndices'], part['skinWeights'], skin)
                world = place(posed, pose['position'], pose['yaw'])
                flat = np.array([to_blender(*p) for p in world]).ravel()
                part['mesh'].vertices.foreach_set('co', flat)
                part['mesh'].update()

        shot = frame['camera']
        camera.location = to_blender(*shot['position'])
        target.location = to_blender(*shot['target'])
        camera_data.angle_y = math.radians(shot['fov'])

        scene.render.filepath = os.path.join(out_dir, f'frame_{number:04d}.png')
        started = time.time()
        bpy.ops.render.render(write_still=True)
        print(f'frame {number} in {time.time() - started:.1f}s — {frame["description"]}', flush=True)


main()
