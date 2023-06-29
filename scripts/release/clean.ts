import fs from "node:fs";

const args = process.argv.slice(2);

for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("-")) {
    args.splice(args.indexOf(args[i]), 1);
    i--;
  }
}

if (args.length < 2 || !args[0].startsWith("source:") || !args[1].includes("@")) {
  console.log("Usage: node clean.ts source:<source-url>@<output-url>");
  process.exit(1);
}

const source = args[0].substring(7);
const output = args[1].substring(args[1].lastIndexOf("@") + 1);

fs.readFile(source, "utf8", (err, data) => {
  if (err) throw err;

  const pkg = JSON.parse(data);

  delete pkg.scripts;
  delete pkg.devDependencies;
  delete pkg["release-it"];
  delete pkg.source;
  delete pkg["publish-config"];
  pkg["main"] = `dist/${pkg.name}.js`;

  fs.writeFile(output, JSON.stringify(pkg), "utf8", err => {
    if (err) throw err;
  });
});
