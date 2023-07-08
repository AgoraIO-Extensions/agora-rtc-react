import{j as e,a as o,F as i}from"./jsx-runtime-670450c2.js";import{M as a,a as c}from"./index-f240734c.js";import{u as s}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-cec1799b.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const u=`## useCurrentUID

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
`;function r(n){return o(i,{children:[e(a,{title:"hooks/useCurrentUID"}),`
`,e(c,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:u})]})}function M(n={}){const{wrapper:t}=Object.assign({},s(),n.components);return t?e(t,Object.assign({},n,{children:e(r,n)})):r()}export{M as default};
//# sourceMappingURL=useCurrentUID.en-US-d98eaea3.js.map
