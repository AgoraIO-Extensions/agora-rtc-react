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
          fs.mkdir(targetPath, err => {
            if (err) throw err;
            copyDir(sourcePath, targetPath);
          });
        } else {
          const prependContent = `import Readme from "../../docs/${file}?raw";\r\rimport { Meta, Markdown } from "@storybook/blocks";\r\r<Meta title="Hook/${file.replace(
            ".mdx",
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
