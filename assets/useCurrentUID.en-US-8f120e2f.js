import{j as e}from"./jsx-runtime-94f6e698.js";import{M as i,d as o}from"./index-ecd88e7f.js";import{u as s}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-c57a35ac.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const a=`## useCurrentUID

Returns the current user ID.

#### Parameters

| Parameter | Type                                                                                                                     | Required | Description                                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\`  | [\`IAgoraRTCClient\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html) &VerticalLine; \`null\` | No       | Created using the Web SDK's [\`IAgoraRTC.createClient\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method. |

#### Returns

| Type                             | Description                                                                                               |
| -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| \`UID\` &VerticalLine; \`undefined\` | The user ID of the current user. If the current user has not joined any channel, \`undefined\` is returned. |

#### Sample code

\`\`\`jsx
import { useCurrentUID } from "agora-rtc-react";

function App() {
  const uid = useCurrentUID();

  return <div>{uid}</div>;
}
\`\`\`
`;function r(n){return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"hooks/useCurrentUID"}),`
`,e.jsx(o,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:a})]})}function g(n={}){const{wrapper:t}=Object.assign({},s(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(r,n)})):r()}export{g as default};
//# sourceMappingURL=useCurrentUID.en-US-8f120e2f.js.map
