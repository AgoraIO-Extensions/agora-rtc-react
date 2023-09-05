import{j as e}from"./jsx-runtime-94f6e698.js";import{M as i,d as r}from"./index-27aeb9e6.js";import{u as s}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-eee929ff.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const a=`## useClientEvent

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
//# sourceMappingURL=useClientEvent.en-US-a433b702.js.map
