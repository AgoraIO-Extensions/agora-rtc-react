import{j as e,a,F as t}from"./jsx-runtime-670450c2.js";import{M as i,a as c}from"./index-23740aa8.js";import{u as s}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-7d2bb680.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const u=`### usePublish

用于发布本地轨道的 Hook。本地轨道将在组件准备好时发布，在组件卸载时取消发布。

#### 参数

| 参数名           | 类型                                    | 是否必选 | 描述                                                                                                                                          |
| ---------------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| \`tracks\`         | \`(ILocalTrack\` &VerticalLine; \`null)[]\` | 必选     | 本地轨道列表。                                                                                                                                |
| \`readyToPublish\` | \`boolean\`                               | 可选     | 是否准备好进行发布。默认为 \`true\`。                                                                                                           |
| \`client\`         | \`IAgoraRTCClient\`                       | 可选     | [IAgoraRTCClient](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) 对象。 |

#### 返回值

无。

#### 使用示例

\`\`\`jsx
import { useLocalAudioTrack, useLocalCameraTrack, usePublish } from "agora-rtc-react";

function App() {
  //get audioTrack and videoTrack before publish
  const audioTrack = useLocalAudioTrack();
  const videoTrack = useLocalCameraTrack();
  usePublish([audioTrack, videoTrack]);

  return <></>;
}
\`\`\`
`;function r(n){return a(t,{children:[e(i,{title:"hooks/usePublish"}),`
`,e(c,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:u})]})}function L(n={}){const{wrapper:o}=Object.assign({},s(),n.components);return o?e(o,Object.assign({},n,{children:e(r,n)})):r()}export{L as default};
//# sourceMappingURL=usePublish.en-US-9ced2f5a.js.map
