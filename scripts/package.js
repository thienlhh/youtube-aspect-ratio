import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const manifestPath = path.resolve("manifest.json");
if (!fs.existsSync(manifestPath)) {
  console.error("Error: manifest.json not found!");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const version = manifest.version || "1.0.0";
const zipName = `youtube-aspect-ratio-v${version}.zip`;
const zipPath = path.resolve(zipName);

// Ensure dist/content.js exists
const distFile = path.resolve("dist", "content.js");
if (!fs.existsSync(distFile)) {
  console.log("Building extension before packaging...");
  execSync("npm run build", { stdio: "inherit" });
}

// Remove old zip if present
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

console.log(`Packaging ${manifest.name} v${version}...`);

// Use native zip command
try {
  execSync(
    `zip -r "${zipName}" manifest.json dist/ icons/ -x "*.DS_Store"`,
    { stdio: "inherit" }
  );

  const stats = fs.statSync(zipPath);
  console.log(`\n✅ Package created successfully: ${zipName}`);
  console.log(`📦 Size: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`🚀 Ready for upload to Chrome Web Store Developer Dashboard!`);
} catch (err) {
  console.error("Packaging failed:", err);
  process.exit(1);
}
