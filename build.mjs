import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { extname } from "node:path";

const files = ["index.html", "styles.css", "app.js", "sw.js", "manifest.webmanifest", "icon.svg"];
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
};

mkdirSync("dist/server", { recursive: true });
mkdirSync("dist/.openai", { recursive: true });
copyFileSync(".openai/hosting.json", "dist/.openai/hosting.json");

const assets = Object.fromEntries(files.map((file) => {
  const body = readFileSync(file, "utf8");
  return [`/${file}`, { body, type: contentTypes[extname(file)] || "text/plain; charset=utf-8" }];
}));
assets["/"] = assets["/index.html"];

const server = `const assets = ${JSON.stringify(assets)};

function withoutVersion(pathname) {
  return pathname.replace(/\\/+$/, "") || "/";
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = withoutVersion(url.pathname);
    const asset = assets[pathname] || assets["/index.html"];
    return new Response(asset.body, {
      headers: {
        "content-type": asset.type,
        "cache-control": pathname === "/index.html" || pathname === "/" ? "no-cache" : "public, max-age=300",
      },
    });
  },
};
`;

writeFileSync("dist/server/index.js", server);
