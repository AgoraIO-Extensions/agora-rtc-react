import{j as n,a as r,F as s}from"./jsx-runtime-670450c2.js";import{M as i,a}from"./index-0eba151c.js";import{u as m}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-c77f45cb.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const c=`### useRemoteVideoTracks

用于自动订阅和获取远端用户视频轨道的 Hook。

- 当组件卸载时， 该 Hook 会停止订阅传入远端用户的视频轨道。
- 当传入 users 发生改变时， 该 Hook 会更新订阅的视频轨道。

#### 参数

| 参数名   | 类型                                               | 是否必选 | 描述                                                                                                                                            |
| -------- | -------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| \`users\`  | \`IAgoraRTCRemoteUser[]\` &VerticalLine; \`undefined\` | 必选     | 远端用户列表。                                                                                                                                  |
| \`client\` | \`IAgoraRTCClient\` &VerticalLine; \`null\`            | 可选     | [IAgoraRTCClient](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) 对象。。 |

#### 返回值

| 类型                  | 描述                     |
| --------------------- | ------------------------ |
| \`IRemoteVideoTrack[]\` | 远端用户的视频轨道列表。 |

#### 使用示例

\`\`\`jsx
import { useRemoteUsers, useRemoteVideoTracks } from "agora-rtc-react";

function App() {
  //get remote user list
  const remoteUsers = useRemoteUsers();
  const videoTracks = useRemoteVideoTracks(remoteUsers);

  return <></>;
}
\`\`\`
`;function t(e){return r(s,{children:[n(i,{title:"hooks/useRemoteVideoTracks"}),`
`,n(a,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:c})]})}function h(e={}){const{wrapper:o}=Object.assign({},m(),e.components);return o?n(o,Object.assign({},e,{children:n(t,e)})):t()}export{h as default};
//# sourceMappingURL=useRemoteVideoTracks.en-US-67b7905d.js.map
