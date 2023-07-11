import{j as n}from"./jsx-runtime-94f6e698.js";import{M as i,d as r}from"./index-4ac64218.js";import{u as c}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-2e78a2bf.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const a=`## useConnectionState

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
`;function o(t){return n.jsxs(n.Fragment,{children:[n.jsx(i,{title:"hooks/useConnectionState"}),`
`,n.jsx(r,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:a})]})}function j(t={}){const{wrapper:e}=Object.assign({},c(),t.components);return e?n.jsx(e,Object.assign({},t,{children:n.jsx(o,t)})):o()}export{j as default};
//# sourceMappingURL=useConnectionState.en-US-bb0d84be.js.map
