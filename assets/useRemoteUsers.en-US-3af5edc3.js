import{j as e}from"./jsx-runtime-94f6e698.js";import{M as o,d as s}from"./index-27aeb9e6.js";import{u as i}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-eee929ff.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const a=`## useRemoteUsers

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
//# sourceMappingURL=useRemoteUsers.en-US-3af5edc3.js.map
