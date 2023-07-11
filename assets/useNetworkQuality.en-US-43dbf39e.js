import{j as n}from"./jsx-runtime-94f6e698.js";import{M as r,d as i}from"./index-4ac64218.js";import{u as a}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-2e78a2bf.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const s=`## useNetworkQuality

用于获取本地用户网络质量。

#### 参数

| 参数名   | 类型                                    | 是否必选 | 描述                                                                                                                                                            |
| -------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\` | \`IAgoraRTCClient\` &VerticalLine; \`null\` | 可选     | 通过 Web SDK 的 [IAgoraRTC.createClient](https://docportal.shengwang.cn/cn/video-call-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createclient) 创建。 |

#### 返回值

| 类型             | 描述                                                                         |
| ---------------- | ---------------------------------------------------------------------------- |
| \`NetworkQuality\` | 本地用户的网络质量信息。详见 [NetworkQuality](./data-types#networkquality)。 |

#### 使用示例

\`\`\`jsx
import { useNetworkQuality } from "agora-rtc-react";

function App() {
  const networkQuality = useNetworkQuality();

  return <div>{networkQuality}</div>;
}
\`\`\`
`;function o(t){return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"hooks/useNetworkQuality"}),`
`,n.jsx(i,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:s})]})}function g(t={}){const{wrapper:e}=Object.assign({},a(),t.components);return e?n.jsx(e,Object.assign({},t,{children:n.jsx(o,t)})):o()}export{g as default};
//# sourceMappingURL=useNetworkQuality.en-US-43dbf39e.js.map
