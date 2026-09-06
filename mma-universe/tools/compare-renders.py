"""Composes the before/after renders into one side-by-side clip."""
import pathlib, subprocess
from io import BytesIO
from PIL import Image, ImageDraw

S = pathlib.Path('/tmp/claude-0/-home-user-100-days-of-code/638b59c8-0359-535b-abbe-566713b07a45/scratchpad')
FFMPEG = '/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux'
GAP = 6
LABEL = 34

before = sorted((S / 'ab_before').glob('frame_*.png'))
after = sorted((S / 'ab_after').glob('frame_*.png'))
pairs = list(zip(before, after))
assert pairs, 'no frames'

probe = Image.open(pairs[0][0])
w, h = probe.size
canvas_size = (w * 2 + GAP, h + LABEL)

process = subprocess.Popen(
    [FFMPEG, '-y', '-loglevel', 'error', '-f', 'image2pipe', '-vcodec', 'mjpeg',
     '-framerate', '24', '-i', 'pipe:0',
     '-c:v', 'libvpx', '-b:v', '2000k', '-deadline', 'good', '-cpu-used', '2',
     '-auto-alt-ref', '0', '-pix_fmt', 'yuv420p', str(S / 'compare.webm')],
    stdin=subprocess.PIPE,
)

for left, right in pairs:
    canvas = Image.new('RGB', canvas_size, (10, 12, 17))
    canvas.paste(Image.open(left).convert('RGB'), (0, LABEL))
    canvas.paste(Image.open(right).convert('RGB'), (w + GAP, LABEL))
    draw = ImageDraw.Draw(canvas)
    draw.text((10, 10), 'BEFORE  —  one clip owns the whole body, feet slide', fill=(150, 158, 172))
    draw.text((w + GAP + 10, 10), 'AFTER  —  layered claims, planted feet, circling', fill=(224, 182, 74))
    buffer = BytesIO()
    canvas.save(buffer, 'JPEG', quality=92)
    process.stdin.write(buffer.getvalue())

process.stdin.close()
assert process.wait() == 0
print(f'{len(pairs)} frames, {(S / "compare.webm").stat().st_size/1024:.0f} KB')
