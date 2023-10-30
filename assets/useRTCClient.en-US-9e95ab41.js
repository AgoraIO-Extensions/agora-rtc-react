import{j as e}from"./jsx-runtime-ffb262ed.js";import{M as o,d as i}from"./index-df2841ce.js";import{u as a}from"./index-a1cf9e47.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-b3faec37.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-ffc7e5ff.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const s=`## useRTCClient

Returns the \`IAgoraRTCClient\` object.

#### Parameters

| Parameter | Type                                                                                                                     | Required | Description                                                                                                                                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\`  | [\`IAgoraRTCClient\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html) &VerticalLine; \`null\` | No       | If provided, the passed \`IAgoraRTCClient\` object is returned. If not provided, the \`IAgoraRTCClient\` object obtained from the [parent component's context](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/functions/AgoraRTCProvider.html) is returned. |

#### Returns

| Type                                                                                               | Description                   |
| -------------------------------------------------------------------------------------------------- | ----------------------------- |
| [\`IAgoraRTCClient\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html) | The \`IAgoraRTCClient\` client. |

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
//# sourceMappingURL=useRTCClient.en-US-9e95ab41.js.map