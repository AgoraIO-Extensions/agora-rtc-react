import fs from "node:fs";

import jsdom from "jsdom";
import MarkdownIt from "markdown-it";

import { docsPath, interfacesPathList, languagesFormat, packagePath } from "../const";

import { readDirRecursively, tableToJson } from "./utils";

const md = new MarkdownIt();

async function writeComment(markdownPath: string) {
  const markdown = fs.readFileSync(markdownPath, "utf-8");
  const result = md.render(markdown, "utf-8");
  const dom: HTMLElement = new jsdom.JSDOM(result).window.document;

  const target = dom.querySelector("h3")?.innerHTML.replace(/<code>(.*?)<\/code>/g, "$1");
  const targetDescription = dom
    .querySelectorAll("p")[0]
    ?.innerHTML.replace(/<code>(.*?)<\/code>/g, "$1");
  const targetRequireParameterList = tableToJson(dom.querySelectorAll("table")[0]);

  interfacesPathList.forEach(key => {
    let content = fs.readFileSync(key, "utf-8");

    if (content.includes(`export interface ${target}`)) {
      let comment = `
/**
 * ${targetDescription}
`;
      comment = comment.concat(`*/`);
      const position = content.indexOf(`export interface ${target}`);
      content = content.slice(0, position - 1) + comment + content.slice(position - 1);

      for (const row of targetRequireParameterList) {
        let interfaceName = "";
        let replacedStr = "";
        if (row[0]?.textContent) {
          interfaceName = row[0].textContent;
        }
        if (row[3]?.innerHTML) {
          replacedStr = row[3]?.innerHTML
            .replace(/<a href="(.*)">(.*)<\/a>/, "[$2]($1)")
            .replace(/&lt;ul&gt;(.*?)&lt;\/ul&gt;/g, "$1")
            .replace(/&lt;li&gt;(.*?)&lt;\/li&gt;/g, "$1")
            .replace(/<code>(.*?)<\/code>/g, "`$1`");
        }
        const interfaceComment = `
/**
 * ${replacedStr}
 */\n`;
        const reg = new RegExp(`${interfaceName}(.*?);`, "g");
        const result = content.match(reg);
        if (result && result[0]) {
          const position = content.indexOf(result[0]);
          content = content.slice(0, position - 1) + interfaceComment + content.slice(position - 1);
        }
      }
      fs.writeFileSync(key, content);
    }
  });
}

async function cleanComment(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  const regex = /\/\*(.*?)\*\//gs;

  content = content.replace(regex, (match, group) => {
    if (group.includes("@ignore")) {
      return match;
    } else if (group.includes("@__PURE__")) {
      return match;
    } else {
      return "";
    }
  });
  fs.writeFileSync(filePath, content);
}

//interfaces clean
await cleanComment(`${packagePath}/src/types.ts`);
await cleanComment(`${packagePath}/src/error.ts`);
await cleanComment(`${packagePath}/src/rtc.ts`);
//interfaces inject
await readDirRecursively(`${docsPath}/interfaces`, async (filePath: string) => {
  if (filePath.includes(languagesFormat[1])) {
    await writeComment(filePath);
  }
});
