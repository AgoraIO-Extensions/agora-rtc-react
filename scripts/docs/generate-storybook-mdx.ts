import fs from "node:fs";
import path from "node:path";

import { docType, docsPath, languagesFormat, storiesPath } from "../const";
import { emptyDirectory } from "../utils";

for (let j = 0; j < docType.length; j++) {
  emptyDirectory(`${storiesPath}/${docType[j]}`);
}

const copyDir = (sourceDir, targetDir) => {
  fs.readdir(sourceDir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      fs.stat(sourcePath, (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          // only copy hooks
          if (path.basename(sourcePath) !== docType[1]) {
            return;
          }
          fs.stat(targetPath, err => {
            if (err) throw err;
            copyDir(sourcePath, targetPath);
          });
        } else {
          //only copy .en-US.md
          if (file.indexOf(languagesFormat[1]) === -1) {
            return;
          }
          const docType = path.basename(path.dirname(targetPath));
          const prependContent = `import Readme from "../../../docs/${docType}/${file}?raw";\r\rimport { Meta, Markdown } from "@storybook/blocks";\r\r<Meta title="${docType}/${file.replace(
            `${languagesFormat[1]}.mdx`,
            "",
          )}" />\r\r<Markdown options={{ namedCodesToUnicode: { VerticalLine: "\u007c" } }}>{Readme}</Markdown>\r`;
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
