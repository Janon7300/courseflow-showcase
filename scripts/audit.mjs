import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";
const root = resolve(import.meta.dirname, "..");
const allowed = new Set([
  ".gitignore", "README.md", "THIRD_PARTY_NOTICES.md", "PORTFOLIO_NOTES.md",
  "index.html", "package.json", "package-lock.json", "tsconfig.json", "vite.config.ts",
  "public/courseflow-mark.svg", "public/theme-init.js",
  "src/App.tsx", "src/main.tsx", "src/index.css", "src/demoData.ts", "src/progress.ts",
  "scripts/audit.mjs", "tests/progress.test.mjs"
]);
const omitted = new Set([".git", "node_modules", "dist", "coverage"]);
const failures = [];
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    if (dir === root && omitted.has(entry.name)) return [];
    if (entry.isSymbolicLink()) { failures.push("Symbolic link: " + relative(root, path)); return []; }
    return entry.isDirectory() ? walk(path) : [path];
  });
}
const files = walk(root);
const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /AIza[0-9A-Za-z_-]{30,}/,
  /(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})/,
  /sk-[A-Za-z0-9_-]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/,
  /(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?):\/\//i
];
const forbiddenIdentifiers = /forms\.gle|docs\.google\.com\/forms|[\w.-]+\.ac\.th|[\w.+-]+@(?:gmail|outlook|hotmail)\.com/i;
for (const file of files) {
  const name = relative(root, file).replaceAll("\\", "/");
  if (!allowed.has(name)) failures.push("Unexpected release file: " + name);
  const content = readFileSync(file, "utf8");
  if (secretPatterns.some(pattern => pattern.test(content))) failures.push("Potential secret: " + name);
  if (!name.startsWith("scripts/") && forbiddenIdentifiers.test(content)) failures.push("Personal/institution link: " + name);
  if (name.startsWith("src/") || name.startsWith("public/")) {
    if (/\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|https?:\/\//.test(content.replace('http://www.w3.org/2000/svg', "")))
      failures.push("Runtime network reference: " + name);
  }
}
const lock = JSON.parse(readFileSync(join(root, "package-lock.json"), "utf8"));
if (Object.keys(lock.packages || {}).some(name => /firebase|@google\/genai|cloudinary|upstash|mysql2|puppeteer|speed-insights/i.test(name)))
  failures.push("Excluded service dependency remains");
for (const name of ["README.md", "src/App.tsx"]) {
  if (!readFileSync(join(root, name), "utf8").includes("Janon7300")) failures.push("Owner credit missing: " + name);
}
if (process.argv.includes("--history")) {
  const git = (...args) => execFileSync("git", ["-C", root, ...args], { encoding: "utf8" }).trim();
  const commits = git("rev-list", "--all").split("\n").filter(Boolean);
  if (commits.length !== 1) failures.push("Release history is not exactly one commit");
  for (const hash of commits) {
    const emails = git("show", "-s", "--format=%ae%n%ce", hash).split("\n");
    if (emails.some(email => !email.endsWith("@users.noreply.github.com"))) failures.push("Non-noreply commit identity");
    for (const name of git("ls-tree", "-r", "--name-only", hash).split("\n")) {
      if (!allowed.has(name)) failures.push("Unexpected historical file: " + name);
      const content = git("show", hash + ":" + name);
      if (secretPatterns.some(pattern => pattern.test(content))) failures.push("Potential secret in history: " + name);
      if (!name.startsWith("scripts/") && forbiddenIdentifiers.test(content)) failures.push("Identity link in history: " + name);
    }
  }
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Release audit passed: " + files.length + " allowlisted source files; no matched secrets, institution links or runtime network calls. Owner credit present.");
  console.log("Pattern scans are risk reduction, not a guarantee of anonymity.");
}
