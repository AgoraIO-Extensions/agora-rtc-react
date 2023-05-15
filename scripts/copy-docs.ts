import fs from "node:fs";
import path from "node:path";

const docsPath = path.join(__dirname, "..", "docs");

if (fs.existsSync(docsPath)) {
  fs.rmSync(docsPath, { recursive: true, force: true });
} else {
  fs.mkdirSync(docsPath);
}

const storybookPath = path.join(__dirname, "..", "packages", "agora-rtc-react", "storybook-static");
if (fs.existsSync(storybookPath)) {
  fs.cpSync(storybookPath, docsPath, { recursive: true });
}

for (const exampleName of fs.readdirSync("examples")) {
  if (exampleName.startsWith(".")) continue;

  const examplePath = path.join("examples", exampleName, "dist");
  if (fs.existsSync(examplePath) && fs.lstatSync(examplePath).isDirectory()) {
    fs.cpSync(examplePath, path.join(docsPath, exampleName), { recursive: true });
  }
}
