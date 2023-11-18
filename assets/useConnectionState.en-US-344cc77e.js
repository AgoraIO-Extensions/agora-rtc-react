import{j as e}from"./jsx-runtime-ffb262ed.js";import{M as i,d as r}from"./index-97e259a1.js";import{u as a}from"./index-a1cf9e47.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-899a710b.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-ffc7e5ff.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const s=`## useConnectionState

Returns the detailed connection state of the SDK.

#### Parameters

| Parameter | Type                                                                                                                     | Required | Description                                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\`  | [\`IAgoraRTCClient\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html) &VerticalLine; \`null\` | No       | Created using the Web SDK's [\`IAgoraRTC.createClient\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method. |

#### Returns

| Type              | Description                                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| \`ConnectionState\` | The connection state between the SDK and Agora's edge server. See [\`ConnectionState\`](https://api-ref.agora.io/en/video-sdk/web/4.x/globals.html#connectionstate) for details. |

#### Sample code

\`\`\`jsx
import { useConnectionState } from "agora-rtc-react";

function App() {
  const connectionState = useConnectionState();

  return <div>{connectionState}</div>;
}
\`\`\`
`;function o(n){return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"hooks/useConnectionState"}),`
`,e.jsx(r,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:s})]})}function S(n={}){const{wrapper:t}=Object.assign({},a(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(o,n)})):o()}export{S as default};
//# sourceMappingURL=useConnectionState.en-US-344cc77e.js.map
