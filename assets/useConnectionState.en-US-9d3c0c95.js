import{j as t,a as i,F as r}from"./jsx-runtime-670450c2.js";import{M as a,a as c}from"./index-77b946d6.js";import{u as s}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-81067870.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const m=`### useConnectionState

用于获取客户端连接状态。

#### 参数

| 参数名   | 类型                                    | 是否必选 | 描述                                                                                                                                          |
| -------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\` | \`IAgoraRTCClient\` &VerticalLine; \`null\` | 可选     | [IAgoraRTCClient](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) 对象。 |

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
`;function o(n){return i(r,{children:[t(a,{title:"hooks/useConnectionState"}),`
`,t(c,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:m})]})}function j(n={}){const{wrapper:e}=Object.assign({},s(),n.components);return e?t(e,Object.assign({},n,{children:t(o,n)})):o()}export{j as default};
//# sourceMappingURL=useConnectionState.en-US-9d3c0c95.js.map
