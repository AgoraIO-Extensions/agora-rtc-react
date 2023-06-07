import fs from "node:fs";
import path from "node:path";

const packagePath = path.join(__dirname, "..", "packages", "agora-rtc-react");
const docsPath = path.join(packagePath, "docs");
const storiesPath = path.join(packagePath, "src", "stories");

const copyDir = (sourceDir, targetDir) => {
  fs.readdir(sourceDir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      fs.stat(sourcePath, (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          // do not copy components
          if (path.basename(sourcePath) === "components") {
            return;
          }
          fs.stat(targetPath, err => {
            if (err) throw err;
            copyDir(sourcePath, targetPath);
          });
        } else {
          //only copy .en-US.md
          if (file.indexOf(".en-US") === -1) {
            return;
          }
          const docType = path.basename(path.dirname(targetPath));
          const prependContent = `import Readme from "../../../docs/${docType}/${file}?raw";\r\rimport { Meta, Markdown } from "@storybook/blocks";\r\r<Meta title="${docType}/${file.replace(
            ".en-US.mdx",
            "",
          )}" />\r\r<Markdown>{Readme}</Markdown>\r`;
          fs.writeFile(targetPath, prependContent, err => {
            if (err) throw err;
            console.log(`${sourcePath} copied to ${targetPath}`);
          });
        }
      });
    });
  });
};

copyDir(docsPath, storiesPath);
