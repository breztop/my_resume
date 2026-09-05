"""Generate responsive covers. Requires Pillow; originals stay untouched."""
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
folder = root / 'public/images/projects'
manifest = {}
before = after = 0
for source in sorted(folder.iterdir()):
    if source.suffix.lower() not in ('.png', '.webp') or source.stem.endswith(('-640', '-1280')):
        continue
    with Image.open(source) as original:
        before += source.stat().st_size
        variants = {}
        for width in (640, 1280):
            size = (width, round(original.height * width / original.width))
            resized = original.convert('RGB').resize(size, Image.Resampling.LANCZOS)
            target = source.with_name(f'{source.stem}-{width}.webp')
            resized.save(target, 'WEBP', quality=84, method=6)
            variants['small' if width == 640 else 'large'] = '/images/projects/' + target.name
            if width == 1280:
                variants.update(width=size[0], height=size[1])
                after += target.stat().st_size
        manifest['/images/projects/' + source.name] = variants
(root / 'src/data/projectImages.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(f'{len(manifest)} covers: originals {before:,} bytes; large variants {after:,} bytes ({100 * (1-after/before):.1f}% smaller)')
