import{j as n}from"./jsx-runtime-94f6e698.js";import{M as i,d as r}from"./index-4ac64218.js";import{u as s}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-2e78a2bf.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const a=`## useIsConnected

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
`;function o(e){return n.jsxs(n.Fragment,{children:[n.jsx(i,{title:"hooks/useIsConnected"}),`
`,n.jsx(r,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:a})]})}function g(e={}){const{wrapper:t}=Object.assign({},s(),e.components);return t?n.jsx(t,Object.assign({},e,{children:n.jsx(o,e)})):o()}export{g as default};
//# sourceMappingURL=useIsConnected.en-US-a5f48f0a.js.map
