import{j as e}from"./jsx-runtime-1a9d9a93.js";import{M as o,d as i}from"./index-01974c7e.js";import{u as a}from"./index-4811e648.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-45288cab.js";import"../sb-preview/runtime.js";import"./index-a38d0dca.js";import"./index-1b441bc2.js";import"./index-8fd8397b.js";import"./index-356e4a49.js";const s=`## useNetworkQuality

Returns the network quality of the local user.

#### Parameters

| Parameter | Type                                                                                                                     | Required | Description                                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\`  | [\`IAgoraRTCClient\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html) &VerticalLine; \`null\` | No       | Created using the Web SDK's [\`IAgoraRTC.createClient\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method. |

#### Returns

| Type             | Description                                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| \`NetworkQuality\` | The network quality of the local user. See [\`NetworkQuality\`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/interfaces/NetworkQuality.html) for details. |

#### Sample code

\`\`\`jsx
import { useNetworkQuality } from "agora-rtc-react";

function App() {
  const networkQuality = useNetworkQuality();

  return <div>{networkQuality}</div>;
}
\`\`\`
`;function r(t){return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"hooks/useNetworkQuality"}),`
`,e.jsx(i,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:s})]})}function x(t={}){const{wrapper:n}=Object.assign({},a(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(r,t)})):r()}export{x as default};
