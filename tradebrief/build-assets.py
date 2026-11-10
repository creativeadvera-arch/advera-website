"""Run after editing app.js or style.css; keep returning browsers on matching assets."""
from pathlib import Path
import hashlib,re,json

root=Path(__file__).parent
page=root/'index.html'
html=page.read_text()
outputs=[]
for name in ['style.css','app.js']:
 source=root/name
 digest=hashlib.sha256(source.read_bytes()).hexdigest()[:12]
 stem,suffix=name.rsplit('.',1)
 hashed=f'{stem}-{digest}.{suffix}'
 (root/hashed).write_bytes(source.read_bytes())
 pattern=rf'(?P<attr>href|src)="{stem}(?:-[0-9a-f]{{12}})?\.{suffix}(?:\?[^\"]*)?"'
 html,count=re.subn(pattern,lambda m:f'{m.group("attr")}="{hashed}"',html)
 if count!=1:raise ValueError(f'Expected exactly one {name} reference, found {count}')
 outputs.append(hashed)
page.write_text(html)
print(json.dumps({'assets':outputs}))
