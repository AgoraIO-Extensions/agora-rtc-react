import fs from "node:fs";
import path from "node:path";

import jsdom from "jsdom";
import MarkdownIt from "markdown-it";

import { docsPath, hooksPath, languagesFormat } from "../const";

import { readDirRecursively, tableToJson } from "./utils";

const md = new MarkdownIt();

async function writeComment(markdownPath) {
  const markdown = fs.readFileSync(markdownPath, "utf-8");
  const result = md.render(markdown, "utf-8");
  const dom: HTMLElement = new jsdom.JSDOM(result).window.document;

  const target = dom.querySelector("h3")?.textContent;
  const targetDescription = dom.querySelectorAll("p")[0]?.textContent;
  const targetRequireParameterList = tableToJson(dom.querySelectorAll("table")[0]);
  const targetRequireParameterInsertList: string[] = [];
  for (const row of targetRequireParameterList) {
    let targetRequireParameterContent = " * @param";
    for (let i = 0; i < row.length; i++) {
      if ((i == 0 || i == 3) && row[i]?.textContent) {
        const replacedStr = row[i].innerHTML
          .replace(/<a href="(.*)">(.*)<\/a>/, "[$2]($1)")
          .replace(/<code>(.*?)<\/code>/g, "`$1`");
        targetRequireParameterContent = targetRequireParameterContent + " " + replacedStr;
      }
      if (i == 1 && row[i]?.textContent) {
        targetRequireParameterContent =
          targetRequireParameterContent + " " + "{" + row[i].textContent + "}";
      }
    }
    targetRequireParameterInsertList.push(targetRequireParameterContent);
  }
  const targetReturnParameterList = tableToJson(dom.querySelectorAll("table")[1]);
  const targetReturnParameterInsertList: string[] = [];
  for (const row of targetReturnParameterList) {
    let targetReturnParameterContent = " * @return";
    for (let i = 0; i < row.length; i++) {
      if ((i == 0 || i == 1) && row[i]?.textContent) {
        targetReturnParameterContent = targetReturnParameterContent + " " + row[i].textContent;
      }
    }
    targetReturnParameterInsertList.push(targetReturnParameterContent);
  }

  const files = fs.readdirSync(hooksPath);
  files.forEach(file => {
    const filePath = path.join(hooksPath, file);

    let content = fs.readFileSync(filePath, "utf-8");

    if (content.includes(`export function ${target}`)) {
      let comment = `
/**
 * ${targetDescription}
 *
`;
      if (targetRequireParameterInsertList.length > 0) {
        comment = comment.concat(targetRequireParameterInsertList.join("\n"));
      }
      if (targetReturnParameterInsertList.length > 0) {
        comment = comment.concat(`\n`);
        comment = comment.concat(targetReturnParameterInsertList.join("\n"));
      }
      comment = comment.concat(`\n */`);
      const position = content.indexOf(`export function ${target}`);
      content = content.slice(0, position - 1) + comment + content.slice(position - 1);
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

//hooks clean
await readDirRecursively(`${hooksPath}`, async (filePath: string) => {
  if (
    filePath.includes("client.ts") ||
    filePath.includes("context.ts") ||
    filePath.includes("tracks.ts") ||
    filePath.includes("users.ts")
  ) {
    await cleanComment(filePath);
  }
});

//hooks inject
await readDirRecursively(`${docsPath}/hooks`, async (filePath: string) => {
  if (filePath.includes(languagesFormat[1])) {
    await writeComment(filePath);
  }
});

//interfaces clean
await readDirRecursively(`${hooksPath}`, async (filePath: string) => {
  if (
    filePath.includes("client.ts") ||
    filePath.includes("context.ts") ||
    filePath.includes("tracks.ts") ||
    filePath.includes("users.ts")
  ) {
    await cleanComment(filePath);
  }
});

//interfaces inject
await readDirRecursively(`${docsPath}/hooks`, async (filePath: string) => {
  if (filePath.includes(languagesFormat[1])) {
    await writeComment(filePath);
  }
});
