import{j as e,a as i,F as r}from"./jsx-runtime-670450c2.js";import{M as s,a}from"./index-77b946d6.js";import{u as c}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-81067870.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const m=`### useIsConnected

用于获取客户端是否连接到服务器。

#### 参数

| 参数名   | 类型                                    | 是否必选 | 描述                     |
| -------- | --------------------------------------- | -------- | ------------------------ |
| \`client\` | \`IAgoraRTCClient\` &VerticalLine; \`null\` | 可选     | \`IAgoraRTCClient\` 对象。 |

#### 返回值

| 类型      | 描述                                                                              |
| --------- | --------------------------------------------------------------------------------- |
| \`boolean\` | <li>\`true\`：客户端已连接到服务器。</li><li>\`false\`：客户端没有连接到服务器。</li> |

#### 使用示例

\`\`\`jsx
import { useIsConnected } from "agora-rtc-react";

function App() {
  const isConnected = useIsConnected();

  return <div>{isConnected}</div>;
}
\`\`\`
`;function o(n){return i(r,{children:[e(s,{title:"hooks/useIsConnected"}),`
`,e(a,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:m})]})}function h(n={}){const{wrapper:t}=Object.assign({},c(),n.components);return t?e(t,Object.assign({},n,{children:e(o,n)})):o()}export{h as default};
//# sourceMappingURL=useIsConnected.en-US-cccb5999.js.map
