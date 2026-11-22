// node md2html.mjs <in.md> <out.html> : Markdown -> HTML (GFM, Mermaid), ảnh/link tương đối theo thư mục file .md
import { marked } from "marked";
import fs from "fs"; import path from "path";
const [inp, out] = process.argv.slice(2);
const md = fs.readFileSync(inp, "utf8").replace(/<!--[\s\S]*?-->/g, "");
// Thoát dấu ~ ngoài mã để GFM không hiểu ~chữ~ là gạch ngang (giữ nguyên nội dung file gốc)
const mdSafe = md.replace(/```[\s\S]*?```|`[^`\n]*`|~/g, m => m === "~" ? "\\~" : m);
const renderer = new marked.Renderer();
const baseCode = renderer.code.bind(renderer);
renderer.code = (code, lang) => lang === "mermaid" ? `<pre class="mermaid">${code}</pre>` : baseCode(code, lang);
marked.use({ gfm: true, renderer });
const body = marked.parse(mdSafe);
const base = "file://" + path.resolve(path.dirname(inp)) + "/";
const nm = "file://" + (process.env.PDF_DEPS || "/tmp/hw05pdf") + "/node_modules";
fs.writeFileSync(out, `<!doctype html><html lang="vi"><head><meta charset="utf-8"><base href="${base}">
<link rel="stylesheet" href="${nm}/github-markdown-css/github-markdown-light.css">
<style>
 @page { size: A4; margin: 14mm 12mm; }
 body { margin: 0; } .markdown-body { font-size: 11px; max-width: none; padding: 0; font-family: -apple-system, "Helvetica Neue", Arial, sans-serif; }
 .markdown-body table { display: table; width: 100%; font-size: 10px; } .markdown-body table td, .markdown-body table th { padding: 3px 6px; }
 .markdown-body pre, .markdown-body code { font-size: 9.5px; white-space: pre-wrap; word-break: break-word; }
 .markdown-body h2 { page-break-before: auto; } tr, img, pre.mermaid { page-break-inside: avoid; }
 pre.mermaid { background: #fff; text-align: center; margin: 0; padding: 4px; }
 pre.mermaid svg { max-height: 222mm; width: auto !important; max-width: 100%; height: auto; }
</style></head><body><article class="markdown-body">${body}</article>
<script src="${nm}/mermaid/dist/mermaid.min.js"></script>
<script>mermaid.initialize({ startOnLoad: true, theme: "default", flowchart: { useMaxWidth: true } });</script>
</body></html>`);
console.log("HTML:", out);
