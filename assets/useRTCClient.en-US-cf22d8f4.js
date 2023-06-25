import{j as t,a as r,F as i}from"./jsx-runtime-670450c2.js";import{M as a,a as s}from"./index-0eba151c.js";import{u as C}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-c77f45cb.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const l=`### useRTCClient

用于从上下文中获取 \`IAgoraRTCClient\` 对象的 Hook。如果没有获取到该对象，则抛出错误。

#### 参数

| 参数名   | 类型                                    | 是否必选 | 描述                                                                                                         |
| -------- | --------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| \`client\` | \`IAgoraRTCClient\` &VerticalLine; \`null\` | 可选     | 如果传入该参数，则使用传入的 \`IAgoraRTCClient\` 对象；如果不传入该参数，则使用返回的 \`IAgoraRTCClient\` 对象。 |

#### 返回值

| 类型              | 描述                     |
| ----------------- | ------------------------ |
| \`IAgoraRTCClient\` | \`IAgoraRTCClient\` 对象。 |

#### 使用示例

\`\`\`jsx
import { useRTCClient } from "agora-rtc-react";

function App() {
  const client = useRTCClient();

  return <></>;
}
\`\`\`
`;function o(n){return r(i,{children:[t(a,{title:"hooks/useRTCClient"}),`
`,t(s,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:l})]})}function j(n={}){const{wrapper:e}=Object.assign({},C(),n.components);return e?t(e,Object.assign({},n,{children:t(o,n)})):o()}export{j as default};
//# sourceMappingURL=useRTCClient.en-US-cf22d8f4.js.map
