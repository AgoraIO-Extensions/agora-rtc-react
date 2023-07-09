import{j as t,a,F as i}from"./jsx-runtime-670450c2.js";import{M as r,a as c}from"./index-44a0be6a.js";import{u as s}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-23ceae64.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const m=`## useConnectionState

用于获取详细的客户端连接状态，包括与服务器连接断开、正在连接中、已连接、正在重连中、正在断开连接。

#### 参数

| 参数名   | 类型                                    | 是否必选 | 描述                                                                                                                                                            |
| -------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\` | \`IAgoraRTCClient\` &VerticalLine; \`null\` | 可选     | 通过 Web SDK 的 [IAgoraRTC.createClient](https://docportal.shengwang.cn/cn/video-call-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createclient) 创建。 |

#### 返回值

| 类型              | 描述                                                                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`ConnectionState\` | 客户端与服务器的连接状态。详见 [ConnectionState](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/globals.html#connectionstate)。 |

#### 使用示例

\`\`\`jsx
import { useConnectionState } from "agora-rtc-react";

function App() {
  const connectionState = useConnectionState();

  return <div>{connectionState}</div>;
}
\`\`\`
`;function o(n){return a(i,{children:[t(r,{title:"hooks/useConnectionState"}),`
`,t(c,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:m})]})}function b(n={}){const{wrapper:e}=Object.assign({},s(),n.components);return e?t(e,Object.assign({},n,{children:t(o,n)})):o()}export{b as default};
//# sourceMappingURL=useConnectionState.en-US-c8dcdc1a.js.map
