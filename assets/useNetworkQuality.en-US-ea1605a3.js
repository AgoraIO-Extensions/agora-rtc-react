import{j as t,a as r,F as a}from"./jsx-runtime-670450c2.js";import{M as i,a as s}from"./index-f240734c.js";import{u as c}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-cec1799b.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const l=`## useNetworkQuality

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
`;function o(n){return r(a,{children:[t(i,{title:"hooks/useNetworkQuality"}),`
`,t(s,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:l})]})}function h(n={}){const{wrapper:e}=Object.assign({},c(),n.components);return e?t(e,Object.assign({},n,{children:t(o,n)})):o()}export{h as default};
//# sourceMappingURL=useNetworkQuality.en-US-ea1605a3.js.map
