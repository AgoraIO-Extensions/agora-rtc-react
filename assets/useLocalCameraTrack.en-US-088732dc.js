import{j as e,a as o,F as t}from"./jsx-runtime-670450c2.js";import{M as i,a as c}from"./index-23740aa8.js";import{u as s}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-7d2bb680.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const m=`### useLocalCameraTrack

用于创建本地摄像头视频轨道的 Hook。

- 在组件被销毁之前，该 Hook 只会创建一次音频轨道。
- 组件卸载后，创建的轨道会停止发布。

#### 参数

| 参数名   | 类型              | 是否必选 | 描述                                                                                                                                          |
| -------- | ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| \`ready\`  | \`boolean\`         | 可选     | 是否准备好创建轨道，默认为 \`true\`。                                                                                                           |
| \`client\` | \`IAgoraRTCClient\` | 可选     | [IAgoraRTCClient](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) 对象。 |

#### 返回值

| 类型                                      | 描述                 |
| ----------------------------------------- | -------------------- |
| \`ICameraVideoTrack\` &VerticalLine; \`null\` | 摄像头视频轨道对象。 |

#### 使用示例

\`\`\`jsx
import { useLocalCameraTrack } from "agora-rtc-react";

function App() {
  const audioTrack = useLocalCameraTrack();

  return <></>;
}
\`\`\`
`;function a(n){return o(t,{children:[e(i,{title:"hooks/useLocalCameraTrack"}),`
`,e(c,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:m})]})}function M(n={}){const{wrapper:r}=Object.assign({},s(),n.components);return r?e(r,Object.assign({},n,{children:e(a,n)})):a()}export{M as default};
//# sourceMappingURL=useLocalCameraTrack.en-US-088732dc.js.map
