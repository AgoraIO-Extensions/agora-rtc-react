import{j as n,a as o,F as s}from"./jsx-runtime-670450c2.js";import{M as i,a}from"./index-0eba151c.js";import{u as m}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-c77f45cb.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const c=`### useRemoteUserTrack

用于获取远端用户音视频轨道的 Hook。

#### 参数

| 参数名      | 类型                                             | 是否必选 | 描述                                                                                                                                                                                    |
| ----------- | ------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`user\`      | \`IAgoraRTCRemoteUser\` &VerticalLine; \`undefined\` | 必选     | 远端用户对象。                                                                                                                                                                          |
| \`mediaType\` | \`"video"\`                                        | 必选     | 媒体类型，目前仅支持 \`"video"\`。                                                                                                                                                        |
| \`client\`    | \`IAgoraRTCClient\` &VerticalLine; \`null\`          | 可选     | [IAgoraRTCClient](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) 对象。。如果提供了客户端实例，则使用提供的实例。 |

#### 返回值

| 类型                                           | 描述                                                                   |
| ---------------------------------------------- | ---------------------------------------------------------------------- |
| \`IRemoteVideoTrack\` &VerticalLine; \`undefined\` | 远端用户的视频轨道。如果远端用户或视频轨道不存在，则返回 \`undefined\`。 |

#### 使用示例

\`\`\`jsx
import { useRemoteUsers, useRemoteUserTrack } from "agora-rtc-react";

function App() {
  //get remote user list
  const remoteUsers = useRemoteUsers();

  const videoTrack = useRemoteUserTrack(remoteUsers[0], "video");
  const audioTrack = useRemoteUserTrack(remoteUsers[0], "audio");

  return <></>;
}
\`\`\`
`;function t(e){return o(s,{children:[n(i,{title:"hooks/useRemoteUserTrack"}),`
`,n(a,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:c})]})}function h(e={}){const{wrapper:r}=Object.assign({},m(),e.components);return r?n(r,Object.assign({},e,{children:n(t,e)})):t()}export{h as default};
//# sourceMappingURL=useRemoteUserTrack.en-US-51d5ce94.js.map
