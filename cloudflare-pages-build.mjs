import { copyFileSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outputDir = "dist-pages";
const files = [
  "index.html",
  "styles.css",
  "app.js",
  "sw.js",
  "manifest.webmanifest",
  "icon.svg",
  "icon-180.png",
  "icon-192.png",
  "icon-512.png",
];

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

for (const file of files) {
  copyFileSync(file, join(outputDir, file));
}

writeFileSync(
  join(outputDir, "_headers"),
  `/
  Cache-Control: no-cache

/index.html
  Cache-Control: no-cache

/sw.js
  Cache-Control: no-cache

/manifest.webmanifest
  Cache-Control: no-cache

/*.js
  Cache-Control: public, max-age=300

/*.css
  Cache-Control: public, max-age=300
`,
);

console.log(`Cloudflare Pages files copied to ${outputDir}`);
