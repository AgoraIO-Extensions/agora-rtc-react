import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("-")) {
    args.splice(args.indexOf(args[i]), 1);
    i--;
  }
}

if (args.length < 2 || !args[0].startsWith("dep:") || !args[1].includes("@")) {
  console.log("Usage: node update-dep-version.js dep:<package-name>@<new-version>");
  process.exit(1);
}

const depName = args[0].substring(4);
const newVersion = args[1].substring(args[1].lastIndexOf("@") + 1);

const packageJsonPath = path.join(process.cwd(), "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

let notFound = false;
if (!packageJson.dependencies || !packageJson.dependencies[depName]) {
  notFound = true;
} else {
  notFound = false;
  packageJson.dependencies[depName] = `${newVersion}`;
  console.log(`Dependency ${depName} version updated to ^${newVersion} in ${packageJsonPath}`);
}

if (!packageJson.devDependencies || !packageJson.devDependencies[depName]) {
  notFound = true;
} else {
  notFound = false;
  packageJson.devDependencies[depName] = `${newVersion}`;
  console.log(`devDependencies ${depName} version updated to ^${newVersion} in ${packageJsonPath}`);
}

if (notFound) {
  process.exit(1);
}

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
