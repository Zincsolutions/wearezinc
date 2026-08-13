#!/usr/bin/env node
// Render a Markdown file to PDF via marked + Playwright Chromium.
// Usage: node scripts/md-to-pdf.mjs docs/BUILD.md /tmp/out.pdf "Doc Title"
import { marked } from 'marked';
import { chromium } from 'playwright';
import fs from 'node:fs';

const [, , mdPath, outPath, title = 'Document'] = process.argv;
const body = marked.parse(fs.readFileSync(mdPath, 'utf8'));

const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
<style>
  body { font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; color: #16202e;
         font-size: 10.5px; line-height: 1.55; margin: 0; }
  h1 { font-size: 21px; letter-spacing: -0.01em; border-bottom: 3px solid #16202e;
       padding-bottom: 8px; margin: 0 0 6px; }
  h1 + p strong { color: #444; }
  h2 { font-size: 14.5px; color: #0c2954; margin: 22px 0 6px;
       border-bottom: 1px solid #e4e1db; padding-bottom: 3px; }
  h2::before { content: ''; display: inline-block; width: 8px; height: 8px;
               background: #ff5b19; margin-right: 7px; }
  strong { color: #0c2954; }
  code { font-family: 'SF Mono', Menlo, monospace; font-size: 9px;
         background: #f1efeb; padding: 1px 4px; border-radius: 3px; }
  pre { background: #f6f5f2; border: 1px solid #e4e1db; border-radius: 6px;
        padding: 10px 12px; overflow-x: hidden; white-space: pre-wrap; }
  pre code { background: none; padding: 0; }
  ul, ol { padding-left: 20px; } li { margin: 2.5px 0; }
  hr { border: none; border-top: 1px solid #e4e1db; margin: 14px 0; }
  a { color: #c23f0a; text-decoration: none; }
  h2, pre, li { break-inside: avoid; }
</style></head><body>${body}</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle' });
await page.pdf({
  path: outPath,
  format: 'A4',
  margin: { top: '18mm', bottom: '18mm', left: '15mm', right: '15mm' },
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate:
    '<div style="width:100%;text-align:center;font-size:8px;color:#8b95a3;font-family:Helvetica,Arial,sans-serif;">wearezinc.com build description — <span class="pageNumber"></span> / <span class="totalPages"></span></div>',
});
await browser.close();
console.log('wrote', outPath);
