import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("-")) {
    args.splice(args.indexOf(args[i]), 1);
    i--;
  }
}
console.log(args);

if (args.length < 2 || !args[0].startsWith("target:") || !args[1].includes("@")) {
  console.log("Usage: node update-target-version.js target:<package-name>@<new-version>");
  process.exit(1);
}

const targetName = args[0].substring(7);
const newVersion = args[1].substring(args[1].lastIndexOf("@") + 1);

const targetPath = path.join(__dirname, "..", "packages", targetName, "src", "rtc.ts");

fs.readFile(targetPath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const updatedData = data.replace(
    /export const VERSION = ".+"/,
    `export const VERSION = "${newVersion}"`,
  );

  fs.writeFile(targetPath, updatedData, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${targetPath} updated with version ${newVersion}`);
  });
});
