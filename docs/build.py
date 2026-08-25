import base64, os, re
p = r"C:\Users\joaol\referency"
html = open(os.path.join(p,"index.html"), encoding="utf-8").read()
for name in ("referency-mark-dark","referency-mark-light","referency-dark","referency-light"):
    b = open(os.path.join(p,"assets",name+".png"),"rb").read()
    uri = "data:image/png;base64," + base64.b64encode(b).decode()
    html = html.replace("assets/%s.png" % name, uri)
html = html.replace("<title>Referency — Ateliê de Seguro Automotivo</title>", "<title>Referency</title>")
out = os.path.join(p,"referency-onefile.html")
open(out,"w",encoding="utf-8").write(html)
print("wrote", out, os.path.getsize(out)//1024, "KB")
print("remaining local refs:", re.findall(r'src="assets/[^"]+"', html))
