import fs from "node:fs";
import path from "node:path";

import rtc_PKG from "../../packages/agora-rtc-react/package.json";
import rtcUI_PKG from "../../packages/agora-rtc-react-ui/package.json";

const args = process.argv.slice(2);

const targetName = args[0];
const newVersion = args[1];

const targetPath = path.join(__dirname, "..", "..", "packages", targetName, "src", "rtc.ts");

let targetPackageJson;
if (targetName === "agora-rtc-react") {
  targetPackageJson = rtc_PKG;
} else if (targetName === "agora-rtc-react-ui") {
  targetPackageJson = rtcUI_PKG;
}
targetPackageJson.version = newVersion;
fs.writeFileSync(
  path.join(__dirname, "..", "..", "packages", targetName, "package.json"),
  JSON.stringify(targetPackageJson, null, 2) + "\n",
);

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
