import{j as e}from"./jsx-runtime-94f6e698.js";import{M as o,d as a}from"./index-c09d4f32.js";import{u as i}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-846f9ee4.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const s=`## useNetworkQuality

Returns the network quality of the local user.

#### Parameters

| Parameter | Type                                                                                                                                                           | Required | Description                                                                                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| \`client\`  | [\`IAgoraRTCClient\`](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) &VerticalLine; \`null\` | No       | Created using the Web SDK's [\`IAgoraRTC.createClient\`](https://docportal.shengwang.cn/cn/video-call-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createclient) method. |

#### Returns

| Type             | Description                                                                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`NetworkQuality\` | The network quality of the local user. See [\`NetworkQuality\`](https://doc.shengwang.cn/api-ref/rtc/react/react-sdk/data-types#networkquality) for details. |

#### Sample code

\`\`\`jsx
import { useNetworkQuality } from "agora-rtc-react";

function App() {
  const networkQuality = useNetworkQuality();

  return <div>{networkQuality}</div>;
}
\`\`\`
`;function r(t){return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"hooks/useNetworkQuality"}),`
`,e.jsx(a,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:s})]})}function k(t={}){const{wrapper:n}=Object.assign({},i(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(r,t)})):r()}export{k as default};
//# sourceMappingURL=useNetworkQuality.en-US-408d7e2b.js.map
