import{j as t,a as i,F as r}from"./jsx-runtime-670450c2.js";import{M as a,a as l}from"./index-23740aa8.js";import{u as s}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-7d2bb680.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const C=`### useOptionalRTCClient

用于从上下文中获取 \`IAgoraRTCClient\` 对象的 Hook。

#### 参数

| 参数名   | 类型                                    | 是否必选 | 描述                                                                                                         |
| -------- | --------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| \`client\` | \`IAgoraRTCClient\` &VerticalLine; \`null\` | 可选     | 如果传入该参数，则使用传入的 \`IAgoraRTCClient\` 对象；如果不传入该参数，则使用返回的 \`IAgoraRTCClient\` 对象。 |

#### 返回值

| 类型                                    | 描述                     |
| --------------------------------------- | ------------------------ |
| \`IAgoraRTCClient\` &VerticalLine; \`null\` | \`IAgoraRTCClient\` 对象。 |

#### 使用示例

\`\`\`jsx
import { useOptionalRTCClient } from "agora-rtc-react";

function App() {
  const client = useOptionalRTCClient();

  return <></>;
}
\`\`\`
`;function e(n){return i(r,{children:[t(a,{title:"hooks/useOptionalRTCClient"}),`
`,t(l,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:C})]})}function j(n={}){const{wrapper:o}=Object.assign({},s(),n.components);return o?t(o,Object.assign({},n,{children:t(e,n)})):e()}export{j as default};
//# sourceMappingURL=useOptionalRTCClient.en-US-f9555c28.js.map
