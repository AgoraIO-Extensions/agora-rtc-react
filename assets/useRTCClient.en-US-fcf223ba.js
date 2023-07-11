import{j as n}from"./jsx-runtime-94f6e698.js";import{M as r,d as i}from"./index-4ac64218.js";import{u as s}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-2e78a2bf.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const a=`## useRTCClient

用于获取 \`IAgoraRTCClient\` 对象。

#### 参数

| 参数名   | 类型                                    | 是否必选 | 描述                                                                                                                                                              |
| -------- | --------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\` | \`IAgoraRTCClient\` &VerticalLine; \`null\` | 可选     | 如果传入该参数，则使用传入的 \`IAgoraRTCClient\` 对象；如果不传入该参数，则使用从[父组件的 Context](./components#agorartcprovider)中获取的 \`IAgoraRTCClient\` 对象。 |

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
`;function o(t){return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"hooks/useRTCClient"}),`
`,n.jsx(i,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:a})]})}function j(t={}){const{wrapper:e}=Object.assign({},s(),t.components);return e?n.jsx(e,Object.assign({},t,{children:n.jsx(o,t)})):o()}export{j as default};
//# sourceMappingURL=useRTCClient.en-US-fcf223ba.js.map
