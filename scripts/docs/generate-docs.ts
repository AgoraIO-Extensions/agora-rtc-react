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
        //do not replace urlPrefix[0], it means chinese.
        if (languages[m] !== "") {
          data = data.replace(/\[`(.+?)`\]\((.+?)\)/g, match => {
            //if not chinese site, replace urlPrefix[1]
            if (match.indexOf("https://docportal.shengwang.cn/cn") === -1) {
              let suffix = "";
              //special case list
              if (match.indexOf("data-types#agorartcreacterror") !== -1) {
                suffix = "classes";
                //interface case
              } else if (match.indexOf("data-types#") !== -1) {
                suffix = "interface";
                //components case
              } else if (match.indexOf("components#") !== -1) {
                console.log(match);
                suffix = "functions";
                //hooks case
              } else if (match.indexOf("hooks#") !== -1) {
                suffix = "functions";
              }
              return match.replace(
                /\[`(.+?)`\]\((.+?)\)/g,
                "[`$1`](" + `${urlPrefix[m]}${suffix}/$1.html)`,
              );
            } else {
              return match;
            }
          });
          data = data.replace(
            /.\/components#agorartcprovider+/g,
            `${urlPrefix[m]}functions/AgoraRTCProvider.html`,
          );
        }
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
