import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open('textbook_page.html', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Pattern for class and subject and books
print("=== EXTRACTING CLASS 1, 2, 3 OFFICIAL NCERT / JCERT TEXTBOOK CODES ===")

# Match all: document.test.tbook.options[x].text = "..." and .value = "textbook.php?<code>=<range>"
pattern = r'document\.test\.tbook\.options\[\d+\]\.text\s*=\s*["\']([^"\']+)["\'];\s*document\.test\.tbook\.options\[\d+\]\.value\s*=\s*["\']textbook\.php\?([^=]+)=([^"\']+)["\']'

matches = re.findall(pattern, html)
print(f"Total book mappings found: {len(matches)}")

for text, code, ch_range in matches:
    if any(code.startswith(prefix) for prefix in ['a', 'b', 'c']):
        print(f"Code: {code:<10} | Range: {ch_range:<8} | Title: {text}")
