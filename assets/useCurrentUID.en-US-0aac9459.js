import{j as n}from"./jsx-runtime-94f6e698.js";import{M as o,d as i}from"./index-4ac64218.js";import{u as s}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-2e78a2bf.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const a=`## useCurrentUID

用于获取当前用户 UID 。

#### 参数

| 参数名   | 类型                                    | 是否必选 | 描述                                                                                                                                                            |
| -------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\` | \`IAgoraRTCClient\` &VerticalLine; \`null\` | 可选     | 通过 Web SDK 的 [IAgoraRTC.createClient](https://docportal.shengwang.cn/cn/video-call-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createclient) 创建。 |

#### 返回值

| 类型                             | 描述                                                               |
| -------------------------------- | ------------------------------------------------------------------ |
| \`UID\` &VerticalLine; \`undefined\` | 当前用户的 UID。如果当前用户没有加入任何频道，则返回 \`undefined\`。 |

#### 使用示例

\`\`\`jsx
import { useCurrentUID } from "agora-rtc-react";

function App() {
  const uid = useCurrentUID();

  return <div>{uid}</div>;
}
\`\`\`
`;function r(e){return n.jsxs(n.Fragment,{children:[n.jsx(o,{title:"hooks/useCurrentUID"}),`
`,n.jsx(i,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:a})]})}function j(e={}){const{wrapper:t}=Object.assign({},s(),e.components);return t?n.jsx(t,Object.assign({},e,{children:n.jsx(r,e)})):r()}export{j as default};
//# sourceMappingURL=useCurrentUID.en-US-0aac9459.js.map
