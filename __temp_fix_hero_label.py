from pathlib import Path

path = Path('index.html')
text = path.read_text(encoding='utf-8')
old = '</h1>\n\n\t\t\t\t\t<!-- Element to contain animated typing -->'
new = '</h1>\n\t\t\t\t\t<p class="hero-label">A PORTFOLIO · Q3 · <span id="hero-year">’26</span></p>\n\n\t\t\t\t\t<!-- Element to contain animated typing -->'
if old not in text:
    raise SystemExit('old string not found')
text = text.replace(old, new, 1)
path.write_text(text, encoding='utf-8')
print('inserted')
