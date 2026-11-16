import { readFileSync } from "node:fs";

const html = readFileSync("INDEX.HTML", "utf8");
const structuredDataText = html
  .split('<script type="application/ld+json">')[1]
  .split("</script>")[0];
const structuredData = JSON.parse(structuredDataText);
const manifest = JSON.parse(readFileSync("manifest.webmanifest", "utf8"));
const menu = readFileSync("construction-menu.html", "utf8");

if (!/<html\s+lang=["']ja["']/i.test(html)) {
  throw new Error('INDEX.HTML must declare Japanese as the primary language.');
}
if (manifest.lang !== "ja") {
  throw new Error('manifest.webmanifest must declare Japanese as the primary language.');
}

console.log(JSON.stringify({
  title: html.match(/<title>(.*?)<\/title>/)?.[1],
  documentLanguage: html.match(/<html\s+lang=["']([^"']+)/i)?.[1],
  siteName: structuredData["@graph"]?.[0]?.name,
  manifestName: manifest.name,
  manifestLanguage: manifest.lang,
  menuNameCount: (menu.match(/特定技能練習問題/g) || menu.match(/特定機能練習問題/g))?.length || 0
}, null, 2));
