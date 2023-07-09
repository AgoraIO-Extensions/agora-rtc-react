import path from "path";

export const docType = ["components", "hooks", "data-types"];
export const languages = ["", "-en"];
export const languagesFormat = [".zh-CN", ".en-US"];

export const packagePath = path.join(__dirname, "..", "packages", "agora-rtc-react");
export const docsPath = path.join(packagePath, "docs");
export const readmePath = path.join(__dirname, "..", "README.md");

export const storiesPath = path.join(packagePath, "src", "stories");
export const hooksPath = path.join(packagePath, "src", "hooks");
export const componentsPath = path.join(packagePath, "src", "components");
export const dataTypesPathList = [
  path.join(packagePath, "src", "types.ts"),
  path.join(packagePath, "src", "rtc.ts"),
  path.join(packagePath, "src", "error.ts"),
];
