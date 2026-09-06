"""Builds the artifact page: the JS bundle, the baked fights, the film and the stills."""
import base64, json, pathlib, subprocess, sys

SCRATCH = pathlib.Path('/tmp/claude-0/-home-user-100-days-of-code/638b59c8-0359-535b-abbe-566713b07a45/scratchpad')
FFMPEG = '/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux'
CAPTIONS = [
    'Right hook lands, round 1',
    'Spinning back kick to the body',
    'Sprawling on the takedown',
]

def data_uri(path: pathlib.Path, mime: str) -> str:
    return f'data:{mime};base64,' + base64.b64encode(path.read_bytes()).decode()

def encode_film() -> pathlib.Path:
    """
    Encodes the rendered frames to WebM.

    The only ffmpeg here is Playwright's, built for screen recording: it has no PNG decoder
    and no image2 demuxer, so it cannot read a numbered PNG sequence at all. It does have
    image2pipe with an MJPEG decoder, so the frames are re-encoded to JPEG in-process and fed
    in over a pipe. VP8 is likewise the only video encoder present, which is fine — WebM plays
    in every current browser.
    """
    from io import BytesIO
    from PIL import Image

    out = SCRATCH / 'film.webm'
    if out.exists():
        out.unlink()
    frames = sorted((SCRATCH / 'clip').glob('frame_*.png'))
    if not frames:
        raise SystemExit('no rendered frames')

    process = subprocess.Popen(
        [FFMPEG, '-y', '-loglevel', 'error', '-f', 'image2pipe', '-vcodec', 'mjpeg',
         '-framerate', '24', '-i', 'pipe:0',
         '-c:v', 'libvpx', '-b:v', '1600k', '-deadline', 'good', '-cpu-used', '2',
         '-auto-alt-ref', '0', '-pix_fmt', 'yuv420p', str(out)],
        stdin=subprocess.PIPE,
    )
    for frame in frames:
        buffer = BytesIO()
        Image.open(frame).convert('RGB').save(buffer, 'JPEG', quality=93)
        process.stdin.write(buffer.getvalue())
    process.stdin.close()
    if process.wait() != 0:
        raise SystemExit('ffmpeg failed')
    return out

def jpeg(src: pathlib.Path, dest: pathlib.Path, width: int, quality: int) -> pathlib.Path:
    from PIL import Image
    image = Image.open(src).convert('RGB')
    if image.width > width:
        image = image.resize((width, round(image.height * width / image.width)), Image.LANCZOS)
    image.save(dest, 'JPEG', quality=quality, optimize=True, progressive=True)
    return dest

def main() -> None:
    film = encode_film()
    poster = jpeg(SCRATCH / 'clip' / 'frame_0000.png', SCRATCH / 'poster.jpg', 900, 78)

    plates = []
    for index, caption in enumerate(CAPTIONS):
        source = SCRATCH / 'stills' / f'frame_{index:04d}.png'
        if not source.exists():
            continue
        still = jpeg(source, SCRATCH / f'plate{index}.jpg', 720, 80)
        plates.append(
            f'<figure><img alt="{caption}" src="{data_uri(still, "image/jpeg")}">'
            f'<figcaption>{caption}</figcaption></figure>'
        )

    head = (SCRATCH / 'art' / 'head.html').read_text()
    head = head.replace('{{VIDEO}}', data_uri(film, 'video/webm'))
    head = head.replace('{{POSTER}}', data_uri(poster, 'image/jpeg'))
    head = head.replace('{{PLATES}}', ''.join(plates))
    compare = SCRATCH / 'compare.webm'
    if compare.exists():
        head = head.replace('{{COMPARE}}', data_uri(compare, 'video/webm'))

    data = json.loads((SCRATCH / 'fights.json').read_text())
    payload = json.dumps(data, separators=(',', ':')).replace('<', '\\u003c')
    bundle = pathlib.Path('/home/user/100-days-of-code/mma-universe/apps/web/dist-artifact/viewer.js').read_text()

    out = head + '\n<script>window.__FIGHTS__=' + payload + ';</script>\n<script>' + bundle + '</script>\n'
    (SCRATCH / 'art' / 'cageside-replay.html').write_text(out)
    (SCRATCH / 'art' / 'preview.html').write_text(
        '<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0}</style></head><body>' + out + '</body></html>'
    )
    print(f'film {film.stat().st_size/1024:.0f} KB, {len(plates)} plates, page {len(out)/1024/1024:.2f} MB')

main()
