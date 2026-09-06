"""Builds the Fight Lab page: the markup and the bundled simulation, in one file."""
import pathlib, subprocess

ROOT = pathlib.Path('/home/user/100-days-of-code/mma-universe')
OUT = pathlib.Path('/tmp/claude-0/-home-user-100-days-of-code/638b59c8-0359-535b-abbe-566713b07a45/scratchpad/art')

subprocess.run(
    ['npx', 'vite', 'build', '--config', 'vite.sandbox.config.ts'],
    cwd=ROOT / 'apps/web', check=True, capture_output=True,
)
head = (ROOT / 'apps/web/src/sandbox/page.html').read_text()
bundle = (ROOT / 'apps/web/dist-sandbox/lab.js').read_text()

OUT.mkdir(parents=True, exist_ok=True)
page = head + '\n<script>' + bundle + '</script>\n'
(OUT / 'fight-lab.html').write_text(page)
(OUT / 'lab-preview.html').write_text(
    '<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0}</style></head><body>'
    + page + '</body></html>'
)
print(f'fight lab: {len(page) / 1024:.0f} KB')
