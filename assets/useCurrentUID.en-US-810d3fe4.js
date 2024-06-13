import{j as e}from"./jsx-runtime-1a9d9a93.js";import{M as i,d as o}from"./index-19babe22.js";import{u as s}from"./index-4811e648.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-8982a7ce.js";import"../sb-preview/runtime.js";import"./index-a38d0dca.js";import"./index-8c3ac41d.js";import"./index-8fd8397b.js";import"./index-356e4a49.js";const a=`## useCurrentUID

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
