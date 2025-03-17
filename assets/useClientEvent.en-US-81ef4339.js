import{j as e}from"./jsx-runtime-1a9d9a93.js";import{M as i,d as r}from"./index-01974c7e.js";import{u as s}from"./index-4811e648.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-45288cab.js";import"../sb-preview/runtime.js";import"./index-a38d0dca.js";import"./index-1b441bc2.js";import"./index-8fd8397b.js";import"./index-356e4a49.js";const a=`## useClientEvent

This hook lets you listen to specific events of the \`IAgoraRTCClient\` object.

- When the component is mounted, this hook registers the corresponding event listener.
- When the component is unmounted, this hook destroys the corresponding event listener.

#### Parameters

| Parameter  | Type                                                                                               | Required | Description                                                                                                                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\`   | [\`IAgoraRTCClient\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html) | Yes      | Created using the Web SDK's [\`IAgoraRTC.createClient\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method.                                                 |
| \`event\`    | \`string\`                                                                                           | Yes      | The event name. Supported values can be found in [\`IAgoraRTCClient.on\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html#on).                                           |
| \`listener\` | \`Function\`                                                                                         | Yes      | The callback function to run when the event is triggered. Supported values can be found in [\`IAgoraRTCClient.on\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html#on). |

#### Returns

None.

#### Sample code

\`\`\`jsx
import { useRTCClient, useClientEvent } from "agora-rtc-react";

function App() {
  const client = useRTCClient();
  useClientEvent(client, "connection-state-change", () => {});

  return <></>;
}
\`\`\`
`;function o(n){return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"hooks/useClientEvent"}),`
`,e.jsx(r,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:a})]})}function x(n={}){const{wrapper:t}=Object.assign({},s(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(o,n)})):o()}export{x as default};
