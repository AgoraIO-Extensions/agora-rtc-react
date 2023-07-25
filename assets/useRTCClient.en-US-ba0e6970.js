import{j as e}from"./jsx-runtime-94f6e698.js";import{M as o,d as i}from"./index-c09d4f32.js";import{u as a}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-846f9ee4.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const s=`## useRTCClient

Returns the \`IAgoraRTCClient\` object.

#### Parameters

| Parameter | Type                                                                                                                                                           | Required | Description                                                                                                                                                                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\`  | [\`IAgoraRTCClient\`](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) &VerticalLine; \`null\` | No       | If provided, the passed \`IAgoraRTCClient\` object is returned. If not provided, the \`IAgoraRTCClient\` object obtained from the [parent component's context](https://doc.shengwang.cn/api-ref/rtc/react/react-sdk/components#agorartcprovider) is returned. |

#### Returns

| Type                                                                                                                                     | Description                   |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| [\`IAgoraRTCClient\`](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) | The \`IAgoraRTCClient\` client. |

#### Sample code

\`\`\`jsx
import { useRTCClient } from "agora-rtc-react";

function App() {
  const client = useRTCClient();

  return <></>;
}
\`\`\`
`;function r(n){return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"hooks/useRTCClient"}),`
`,e.jsx(i,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:s})]})}function T(n={}){const{wrapper:t}=Object.assign({},a(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(r,n)})):r()}export{T as default};
//# sourceMappingURL=useRTCClient.en-US-ba0e6970.js.map
