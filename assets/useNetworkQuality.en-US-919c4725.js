import{j as t,a as r,F as i}from"./jsx-runtime-670450c2.js";import{M as a,a as s}from"./index-0eba151c.js";import{u as c}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-c77f45cb.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const l=`### useNetworkQuality

用于获取本地用户网络质量的 Hook。

#### 参数

| 参数名   | 类型                                    | 是否必选 | 描述                                                                                                                                          |
| -------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\` | \`IAgoraRTCClient\` &VerticalLine; \`null\` | 可选     | [IAgoraRTCClient](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) 对象。 |

#### 返回值

| 类型             | 描述                                                                                                                                                             |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`NetworkQuality\` | 本地用户的网络质量信息。详见 [NetworkQuality](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/globals.html#networkquality)。 |

#### 使用示例

\`\`\`jsx
import { useNetworkQuality } from "agora-rtc-react";

function App() {
  const networkQuality = useNetworkQuality();

  return <div>{networkQuality}</div>;
}
\`\`\`
`;function o(n){return r(i,{children:[t(a,{title:"hooks/useNetworkQuality"}),`
`,t(s,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:l})]})}function Q(n={}){const{wrapper:e}=Object.assign({},c(),n.components);return e?t(e,Object.assign({},n,{children:t(o,n)})):o()}export{Q as default};
//# sourceMappingURL=useNetworkQuality.en-US-919c4725.js.map
