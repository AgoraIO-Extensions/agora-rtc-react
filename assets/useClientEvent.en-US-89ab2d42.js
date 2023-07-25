import{j as e}from"./jsx-runtime-94f6e698.js";import{M as r,d as i}from"./index-c09d4f32.js";import{u as s}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-846f9ee4.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const c=`## useClientEvent

This hook lets you listen to specific events of the \`IAgoraRTCClient\` object.

- When the component is mounted, the hook registers the corresponding event listener.
- When the component is unmounted, the hook destroys the corresponding event listener.

#### Parameters

| Parameter  | Type                                                                                                                                     | Required | Description                                                                                                                                                                                                                                             |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\`   | [\`IAgoraRTCClient\`](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) | Yes      | Created using the Web SDK's [\`IAgoraRTC.createClient\`](https://docportal.shengwang.cn/cn/video-call-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createclient) method.                                                                          |
| \`event\`    | \`string\`                                                                                                                                 | Yes      | The event name. Supported values can be found in [\`IAgoraRTCClient.on\`](https://docportal.shengwang.cn/cn/video-call-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html?platform=All%20Platforms#on).                                           |
| \`listener\` | \`Function\`                                                                                                                               | Yes      | The callback function to run when the event is triggered. Supported values can be found in [\`IAgoraRTCClient.on\`](https://docportal.shengwang.cn/cn/video-call-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html?platform=All%20Platforms#on). |

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
`;function o(n){return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"hooks/useClientEvent"}),`
`,e.jsx(i,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:c})]})}function R(n={}){const{wrapper:t}=Object.assign({},s(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(o,n)})):o()}export{R as default};
//# sourceMappingURL=useClientEvent.en-US-89ab2d42.js.map
