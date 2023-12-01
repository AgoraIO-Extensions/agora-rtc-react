import fs from "node:fs";
import path from "node:path";

import jsdom from "jsdom";
import MarkdownIt from "markdown-it";

import { componentsPath, docsPath, languagesFormat } from "../const";

import { readDirRecursively, tableToJson } from "./utils";

const md = new MarkdownIt();

function isTargetFile(filePath: string) {
  return !filePath.includes("TrackBoundary.tsx") && !filePath.includes("UserCover.tsx");
}

async function writeComment(markdownPath: string) {
  const markdown = fs.readFileSync(markdownPath, "utf-8");
  const result = md.render(markdown, "utf-8");
  const dom: Document = new jsdom.JSDOM(result).window.document;

  const target = dom.querySelector("H2")?.innerHTML.replace(/<code>(.*?)<\/code>/g, "$1");
  const targetDescription = dom
    .querySelectorAll("p")[0]
    ?.innerHTML.replace(/<code>(.*?)<\/code>/g, "$1");
  const targetRequireParameterList = tableToJson(dom.querySelectorAll("table")[0]);
  const targetDemoCode = dom.querySelectorAll("pre")[0].textContent;

  const files = fs.readdirSync(componentsPath);
  files.forEach(file => {
    const filePath = path.join(componentsPath, file);

    let content = fs.readFileSync(filePath, "utf-8");

    if (content.includes(`export function ${target}`)) {
      let comment = `
/**
 * ${targetDescription}
`;
      comment = comment.concat(` * @example\n`);
      if (targetDemoCode) {
        comment = comment.concat(
          ` * \`\`\`jsx\n * ${targetDemoCode.replace(/\n/g, `\n * `)}\`\`\`\n`,
        );
      }
      comment = comment.concat(`*/`);
      const position = content.indexOf(`export function ${target}`);
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
            .replace(/&lt;li&gt;(.*?)&lt;\/li&gt;/g, "$1")
            .replace(/<code>(.*?)<\/code>/g, "`$1`");
        }
        const interfaceComment = `
/**
 * ${replacedStr}
 */\n`;
        if (content.includes(`readonly ${interfaceName}`)) {
          const interfacePosition = content.indexOf(`readonly ${interfaceName}`);
          content =
            content.slice(0, interfacePosition - 1) +
            interfaceComment +
            content.slice(interfacePosition - 1);
        }
      }
      fs.writeFileSync(filePath, content);
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

//components clean
await readDirRecursively(`${componentsPath}`, async (filePath: string) => {
  if (isTargetFile(filePath)) {
    await cleanComment(filePath);
  }
});

// components inject
await readDirRecursively(`${docsPath}/components`, async (filePath: string) => {
  if (filePath.includes(languagesFormat[1]) && isTargetFile(filePath)) {
    await writeComment(filePath);
  }
});
