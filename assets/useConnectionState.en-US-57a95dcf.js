import{j as e}from"./jsx-runtime-1a9d9a93.js";import{M as i,d as r}from"./index-01974c7e.js";import{u as a}from"./index-4811e648.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-45288cab.js";import"../sb-preview/runtime.js";import"./index-a38d0dca.js";import"./index-1b441bc2.js";import"./index-8fd8397b.js";import"./index-356e4a49.js";const s=`## useConnectionState

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
