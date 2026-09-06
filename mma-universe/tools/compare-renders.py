"""
Composes two render directories into one side-by-side clip.

Usage:
    python3 tools/compare-renders.py <before-dir> <after-dir> <out.webm> [left label] [right label]

The only ffmpeg available is Playwright's, built for screen recording, and it has no stacking
filter — its configure line enables pad, crop and scale and nothing else — so the frames are
composited here before encoding.
"""

import sys
import pathlib, subprocess
from io import BytesIO
from PIL import Image, ImageDraw

S = pathlib.Path('/tmp/claude-0/-home-user-100-days-of-code/638b59c8-0359-535b-abbe-566713b07a45/scratchpad')
FFMPEG = '/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux'
GAP = 6
LABEL = 34

before_dir = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else S / 'ab_before'
after_dir = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else S / 'ab_after'
out_path = pathlib.Path(sys.argv[3]) if len(sys.argv) > 3 else S / 'compare.webm'
left_label = sys.argv[4] if len(sys.argv) > 4 else 'BEFORE'
right_label = sys.argv[5] if len(sys.argv) > 5 else 'AFTER'

before = sorted(before_dir.glob('frame_*.png'))
after = sorted(after_dir.glob('frame_*.png'))
pairs = list(zip(before, after))
assert pairs, 'no frames'

probe = Image.open(pairs[0][0])
w, h = probe.size
canvas_size = (w * 2 + GAP, h + LABEL)

process = subprocess.Popen(
    [FFMPEG, '-y', '-loglevel', 'error', '-f', 'image2pipe', '-vcodec', 'mjpeg',
     '-framerate', '24', '-i', 'pipe:0',
     '-c:v', 'libvpx', '-b:v', '2000k', '-deadline', 'good', '-cpu-used', '2',
     '-auto-alt-ref', '0', '-pix_fmt', 'yuv420p', str(out_path)],
    stdin=subprocess.PIPE,
)

for left, right in pairs:
    canvas = Image.new('RGB', canvas_size, (10, 12, 17))
    canvas.paste(Image.open(left).convert('RGB'), (0, LABEL))
    canvas.paste(Image.open(right).convert('RGB'), (w + GAP, LABEL))
    draw = ImageDraw.Draw(canvas)
    draw.text((10, 10), left_label, fill=(150, 158, 172))
    draw.text((w + GAP + 10, 10), right_label, fill=(224, 182, 74))
    buffer = BytesIO()
    canvas.save(buffer, 'JPEG', quality=92)
    process.stdin.write(buffer.getvalue())

process.stdin.close()
assert process.wait() == 0
print(f'{len(pairs)} frames, {out_path.stat().st_size/1024:.0f} KB')
