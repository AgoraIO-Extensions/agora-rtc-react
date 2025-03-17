import{j as e}from"./jsx-runtime-1a9d9a93.js";import{M as o,d as s}from"./index-01974c7e.js";import{u as i}from"./index-4811e648.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-45288cab.js";import"../sb-preview/runtime.js";import"./index-a38d0dca.js";import"./index-1b441bc2.js";import"./index-8fd8397b.js";import"./index-356e4a49.js";const a=`## useRemoteUsers

This hook lets you retrieve the list of remote users.

The return value of this hook is updated in the following cases:

- When a remote user joins or leaves the channel.
- When the role of a remote user changes (for example, from broadcaster to audience).
- When a remote user publishes or unpublishes the audio or video track.

#### Parameters

| Parameter | Type                                                                                                                     | Required | Description                                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\`  | [\`IAgoraRTCClient\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html) &VerticalLine; \`null\` | No       | Created using the Web SDK's [\`IAgoraRTC.createClient\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method. |

#### Returns

| Type                    | Description               |
| ----------------------- | ------------------------- |
| \`IAgoraRTCRemoteUser[]\` | The list of remote users. |

#### Sample code

\`\`\`jsx
import { useRemoteUsers } from "agora-rtc-react";

function App() {
  const remoteUsers = useRemoteUsers();

  return <></>;
}
\`\`\`
`;function r(t){return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"hooks/useRemoteUsers"}),`
`,e.jsx(s,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:a})]})}function j(t={}){const{wrapper:n}=Object.assign({},i(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(r,t)})):r()}export{j as default};
