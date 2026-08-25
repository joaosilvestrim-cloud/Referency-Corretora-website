"""
Gera dist/onefile.html: o site inteiro em um arquivo só.

CSS e JS entram embutidos, e os logos viram data URI. Serve para mandar o site
por WhatsApp ou e-mail sem depender de servidor.

Uso:  npm run build && python scripts/build-onefile.py
"""
import base64
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, 'dist')

if not os.path.isdir(DIST):
    sys.exit('dist/ nao existe. Rode "npm run build" antes.')

html = open(os.path.join(DIST, 'index.html'), encoding='utf-8').read()


def read_asset(url):
    """Resolve uma URL absoluta do build para o arquivo em dist/."""
    return open(os.path.join(DIST, url.lstrip('/')), 'rb').read()


# 1. imagens viram data URI, tanto no HTML quanto dentro do bundle JS
def inline_images(text):
    for name in os.listdir(DIST):
        if not name.endswith('.png'):
            continue
        raw = open(os.path.join(DIST, name), 'rb').read()
        uri = 'data:image/png;base64,' + base64.b64encode(raw).decode()
        text = text.replace('/' + name, uri)
    return text


# 2. CSS embutido
for href in re.findall(r'<link[^>]+rel="stylesheet"[^>]+href="(/assets/[^"]+\.css)"[^>]*>', html):
    css = inline_images(read_asset(href).decode('utf-8'))
    html = re.sub(
        r'<link[^>]+href="%s"[^>]*>' % re.escape(href),
        '<style>%s</style>' % css,
        html,
    )

# 3. JS embutido
for src in re.findall(r'<script[^>]+src="(/assets/[^"]+\.js)"[^>]*></script>', html):
    js = inline_images(read_asset(src).decode('utf-8'))
    html = html.replace(
        '<script type="module" crossorigin src="%s"></script>' % src,
        '<script type="module">%s</script>' % js,
    )

# 4. o que sobrou no HTML (favicon, og:image)
html = inline_images(html)

# 5. no arquivo único o título é só o nome
html = html.replace(
    '<title>Referency — Ateliê de Seguro Automotivo</title>',
    '<title>Referency</title>',
)

out = os.path.join(DIST, 'onefile.html')
open(out, 'w', encoding='utf-8').write(html)

leftovers = re.findall(r'(?:src|href)="(/[^"]+)"', html)
print('escrito:', out, os.path.getsize(out) // 1024, 'KB')
print('referencias locais restantes:', leftovers or 'nenhuma')
