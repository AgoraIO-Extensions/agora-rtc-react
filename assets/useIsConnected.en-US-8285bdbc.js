import{j as e}from"./jsx-runtime-ffb262ed.js";import{M as r,d as i}from"./index-97e259a1.js";import{u as s}from"./index-a1cf9e47.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-899a710b.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-ffc7e5ff.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const a=`## useIsConnected

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
//# sourceMappingURL=useIsConnected.en-US-8285bdbc.js.map
