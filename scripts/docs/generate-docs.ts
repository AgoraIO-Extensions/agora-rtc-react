import fs from "node:fs";

import { docType, docsPath, languages, languagesFormat, urlPrefix } from "../const";
import { emptyDirectory } from "../utils";

const prefix = "## ";

const writeFile = (title, content, filePath) => {
  //add \n after ## title
  content = prefix + title + "\n" + content;
  //remove \n last line
  content = content.slice(0, content.length - 1);
  fs.writeFile(filePath, content, err => {
    if (err) throw err;
    console.log(`${filePath} generated`);
  });
};

for (let j = 0; j < docType.length; j++) {
  emptyDirectory(`${docsPath}/${docType[j]}`);
  for (let m = 0; m < languages.length; m++) {
    fs.readFile(`${docsPath}/${docType[j]}${languages[m]}.mdx`, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        data = data.replace(/\.\/+/g, urlPrefix[m]);
        data = data.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, match => {
          return (
            prefix +
            match
              .replace(/\n/g, "")
              .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, "$1")
              .slice()
              .trim()
          );
        });
        console.log(data);
        const lines = data.split("\n");

        let content = "";
        let title = "";
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.startsWith(prefix)) {
            if (content && title) {
              writeFile(
                title,
                content,
                `${docsPath}/${docType[j]}/${title + languagesFormat[m]}.mdx`,
              );
            }
            content = "";
            title = line.slice(prefix.length).trim();
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
