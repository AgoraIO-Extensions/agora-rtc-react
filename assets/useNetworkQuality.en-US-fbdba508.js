import{j as e}from"./jsx-runtime-ffb262ed.js";import{M as o,d as i}from"./index-1ca10796.js";import{u as a}from"./index-a1cf9e47.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-f0ff49a8.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-ffc7e5ff.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const s=`## useNetworkQuality

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
//# sourceMappingURL=useNetworkQuality.en-US-fbdba508.js.map
