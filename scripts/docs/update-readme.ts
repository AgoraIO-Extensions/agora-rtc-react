import fs from "node:fs";
import path from "path";

import jsdom from "jsdom";
import MarkdownIt from "markdown-it";

import { docsPath, languagesFormat } from "../const";

import { readDirRecursively } from "./utils";
const md = new MarkdownIt();
let insertList: { title: string; description: string }[] = [];

const cleanReadme = async (readmePath: string) => {
  let result = fs.readFileSync(readmePath, "utf-8");
  result = result.replace(/# Components([\s\S]*?)# Hooks/g, "# Components\n\n# Hooks");
  result = result.replace(/# Hooks([\s\S]*?)# License/g, "# Hooks\n\n# License");
  fs.writeFileSync(readmePath, result);
};

const writeReadme = async (readmePath: string, flag: string, path: string, language: string) => {
  let content = fs.readFileSync(readmePath, "utf-8");
  const position = content.indexOf(flag);
  for (let i = 0; i < insertList.length; i++) {
    content =
      content.slice(0, position + flag.length) +
      `\n\n` +
      "  - [`" +
      insertList[i].title +
      "`]" +
      `(${path}/${insertList[i].title}${language}.mdx) &mdash; ${insertList[i].description}` +
      content.slice(position + flag.length);
  }

  fs.writeFileSync(readmePath, content, "utf8");
  insertList = [];
};

const readCallback = (filePath: string, language: string) => {
  const title = path.basename(filePath.replace(language, "")).replace(".mdx", "");
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

for (let i = 0; i < languagesFormat.length; i++) {
  let readmePath: string;
  if (i === 1) {
    readmePath = path.join(__dirname, "..", "..", "README.md");
  } else {
    readmePath = path.join(__dirname, "..", "..", `README${languagesFormat[i]}.md`);
  }
  await cleanReadme(readmePath);
  await readDirRecursively(`${docsPath}/hooks`, async (filePath: string) => {
    if (filePath.includes(languagesFormat[i])) {
      readCallback(filePath, languagesFormat[i]);
    }
  });
  await writeReadme(
    readmePath,
    "# Hooks",
    `https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks`,
    languagesFormat[i],
  );
  await readDirRecursively(`${docsPath}/components`, async (filePath: string) => {
    if (filePath.includes(languagesFormat[i])) {
      readCallback(filePath, languagesFormat[i]);
    }
  });
  await writeReadme(
    readmePath,
    "# Components",
    `https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components`,
    languagesFormat[i],
  );
}
