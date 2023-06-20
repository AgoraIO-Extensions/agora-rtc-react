import fs from "node:fs";

import { docType, docsPath, languages, languagesFormat } from "./const";
import { emptyDirectory } from "./utils";

for (let j = 0; j < docType.length; j++) {
  emptyDirectory(`${docsPath}/${docType[j]}`);
  for (let m = 0; m < languages.length; m++) {
    fs.readFile(`${docsPath}/${docType[j]}${languages[m]}.mdx`, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const lines = data.split("\n");

        let content = "";
        let title = "";
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.startsWith("### ")) {
            if (content && title) {
              writeFile(
                title,
                content,
                `${docsPath}/${docType[j]}/${title + languagesFormat[m]}.mdx`,
              );
            }
            content = "";
            title = line.slice(4).trim();
          } else {
            content += line + "\n";
          }
        }

        if (content && title) {
          writeFile(title, content, `${docsPath}/${docType[j]}/${title + languagesFormat[m]}.mdx`);
        }
      }
    });
  }
}
const writeFile = (title, content, filePath) => {
  //add \n after ### title
  content = "### " + title + "\n" + content;
  //remove \n last line
  content = content.slice(0, content.length - 1);
  fs.writeFile(filePath, content, err => {
    if (err) throw err;
    console.log(`${filePath} generated`);
  });
};
