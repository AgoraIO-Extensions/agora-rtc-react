import fs from "node:fs";
import path from "path";

import jsdom from "jsdom";
import MarkdownIt from "markdown-it";

import { docsPath, languagesFormat, readmePath } from "../const";

import { readDirRecursively } from "./utils";
const md = new MarkdownIt();

const cleanReadme = async () => {
  let result = fs.readFileSync(readmePath, "utf-8");
  result = result.replace(/# Components([\s\S]*?)# Hooks/g, "# Components\n\n# Hooks");
  result = result.replace(/# Hooks([\s\S]*?)# License/g, "# Hooks\n\n# License");
  fs.writeFileSync(readmePath, result);
};

const writeReadme = async (flag: string, path: string) => {
  let content = fs.readFileSync(readmePath, "utf-8");
  const position = content.indexOf(flag);
  for (let i = 0; i < insertList.length; i++) {
    content =
      content.slice(0, position + flag.length) +
      `\n\n` +
      "  - [`" +
      insertList[i].title +
      "`]" +
      `(${path}/${insertList[i].title}${languagesFormat[1]}.mdx) &mdash; ${insertList[i].description}` +
      content.slice(position + flag.length);
  }

  fs.writeFileSync(readmePath, content, "utf8");
};

const readCallback = (filePath: string) => {
  const title = path.basename(filePath.replace(languagesFormat[1], "")).replace(".mdx", "");
  const result = fs.readFileSync(filePath, "utf-8");

  const dom: Document = new jsdom.JSDOM(md.render(result, "utf-8")).window.document;

  const targetDescription = dom
    .querySelectorAll("p")[0]
    ?.innerHTML.replace(/<code>(.*?)<\/code>/g, "$1");
  insertList.push({
    title,
    description: targetDescription,
  });
};

await cleanReadme();
let insertList: { title: string; description: string }[] = [];
await readDirRecursively(`${docsPath}/hooks`, async (filePath: string) => {
  if (filePath.includes(languagesFormat[1])) {
    readCallback(filePath);
  }
});
await writeReadme(
  "# Hooks",
  `https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks`,
);
insertList = [];
await readDirRecursively(`${docsPath}/components`, async (filePath: string) => {
  if (filePath.includes(languagesFormat[1])) {
    readCallback(filePath);
  }
});
await writeReadme(
  "# Components",
  `https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components`,
);
