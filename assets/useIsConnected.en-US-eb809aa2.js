import{j as e}from"./jsx-runtime-1a9d9a93.js";import{M as r,d as i}from"./index-01974c7e.js";import{u as s}from"./index-4811e648.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-45288cab.js";import"../sb-preview/runtime.js";import"./index-a38d0dca.js";import"./index-1b441bc2.js";import"./index-8fd8397b.js";import"./index-356e4a49.js";const a=`## useIsConnected

Returns whether the SDK is connected to Agora's server.

#### Parameters

| Parameter | Type                                                                                                                     | Required | Description                                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\`  | [\`IAgoraRTCClient\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html) &VerticalLine; \`null\` | No       | Created using the Web SDK's [\`IAgoraRTC.createClient\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method. |

#### Returns

| Type      | Description                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| \`boolean\` | <li>\`true\`: The SDK is connected to the server.</li><li>\`false\`: The SDK is not connected to the server.</li> |

#### Sample code

\`\`\`jsx
import { useIsConnected } from "agora-rtc-react";

function App() {
  const isConnected = useIsConnected();

  return <div>{isConnected}</div>;
}
\`\`\`
`;function o(n){return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"hooks/useIsConnected"}),`
`,e.jsx(i,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:a})]})}function j(n={}){const{wrapper:t}=Object.assign({},s(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(o,n)})):o()}export{j as default};
