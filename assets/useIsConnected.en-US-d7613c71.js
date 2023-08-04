import{j as e}from"./jsx-runtime-94f6e698.js";import{M as r,d as i}from"./index-01308511.js";import{u as s}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-dbb49c37.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const a=`## useIsConnected

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
//# sourceMappingURL=useIsConnected.en-US-d7613c71.js.map
