import io, re

main = io.open("/private/tmp/claude-501/-Users-jimini/5595b278-6a68-4e18-8975-a50f8f65de71/scratchpad/ecom-main.html").read()

# sanity: JSX-breaking braces in text?
text_only = re.sub(r'<[^>]+>', ' ', main)
assert '{' not in text_only and '}' not in text_only, "curly braces in text need escaping"

# ---------- helpers ----------
def find_matching_div(s, start):
    """start = index of '<div'; returns index just past its matching </div>."""
    i = s.find('>', start) + 1
    depth = 1
    while depth:
        m = re.search(r'<div\b|</div>', s[i:])
        if not m: raise ValueError('unbalanced')
        i += m.end()
        depth += 1 if m.group(0) != '</div>' else -1
    return i

# ---------- extract FAQ items ----------
faq_list_start = main.find('class="faq2_list"')
faq_list_open = main.rfind('<div', 0, faq_list_start)
faq_list_end = find_matching_div(main, faq_list_open)
faq_block = main[faq_list_open:faq_list_end]

items = []
pos = 0
while True:
    a = faq_block.find('class="faq2_accordion"', pos)
    if a == -1: break
    a_open = faq_block.rfind('<div', 0, a)
    a_end = find_matching_div(faq_block, a_open)
    acc = faq_block[a_open:a_end]
    qm = re.search(r'faq2_question[^>]*>\s*<div[^>]*>(.*?)</div>', acc, re.S)
    ans_i = acc.find('class="faq2_answer"')
    ans_open = acc.rfind('<div', 0, ans_i)
    ans_end = find_matching_div(acc, ans_open)
    ans_inner = acc[acc.find('>', ans_open) + 1:ans_end - len('</div>')]
    items.append((qm.group(1).strip(), ans_inner.strip()))
    pos = a_end
print(f"FAQ items extracted: {len(items)}")
for q, a in items: print("  Q:", q[:60])

# replace the accordions inside faq2_list with the component slot
list_tag_end = faq_block.find('>') + 1
new_faq_block = faq_block[:list_tag_end] + "\n<FaqItems />\n" + "</div>"
main = main[:faq_list_open] + new_faq_block + main[faq_list_end:]

# ---------- strip IX2 artifacts ----------
main = re.sub(r'\s*data-w-id="[^"]*"', '', main)
main = re.sub(r'\s*style="width:100%;height:0px"', '', main)
# hero p: long transform/opacity inline style → fade-up class
def fade_sub(m):
    tag = m.group(0)
    tag = re.sub(r'\s*style="[^"]*"', '', tag)
    tag = tag.replace('class="text-size-medium"', 'class="text-size-medium fade-up"')
    return tag
main = re.sub(r'<p[^>]*style="[^"]*transform[^"]*"[^>]*>', fade_sub, main)
assert 'transform:translate3d' not in main, "IX2 inline style remains"

# ---------- HTML → JSX ----------
main = re.sub(r'<!--.*?-->', '', main, flags=re.S)
main = main.replace('class="', 'className="')
main = main.replace('srcset="', 'srcSet="')
main = main.replace('fill-rule=', 'fillRule=')
main = main.replace('clip-rule=', 'clipRule=')
main = main.replace('stroke-width=', 'strokeWidth=')
main = main.replace('tabindex=', 'tabIndex=')

jsx = main.strip()

# ---------- FaqItem data file ----------
faq_ts = io.StringIO()
faq_ts.write('// FAQ content extracted verbatim from the Webflow capture.\n')
faq_ts.write('// Answers are our own trusted static content (rendered via innerHTML).\n')
faq_ts.write('export const FAQ_ITEMS = [\n')
for q, a in items:
    a_js = a.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
    q_js = q.replace('\\', '\\\\').replace('"', '\\"')
    faq_ts.write(f'  {{ q: "{q_js}", a: `{a_js}` }},\n')
faq_ts.write('];\n')
io.open('src/app/solutions/ecommerce-acceleration/faq-items.ts', 'w').write(faq_ts.getvalue())

# ---------- content component ----------
out = io.StringIO()
out.write('/* eslint-disable @next/next/no-img-element */\n')
out.write('// Markup converted mechanically from the Webflow capture (Phase B).\n')
out.write('// Structure is verbatim; only the FAQ accordions are componentized\n')
out.write('// (see faq.tsx) and IX2 inline styles replaced by CSS animations.\n')
out.write('import { FaqItems } from "./faq";\n\n')
out.write('export function EcomContent() {\n  return (\n    <>\n')
out.write(jsx)
out.write('\n    </>\n  );\n}\n')
io.open('src/app/solutions/ecommerce-acceleration/content.tsx', 'w').write(out.getvalue())
print("content.tsx written:", len(out.getvalue()), "bytes")
