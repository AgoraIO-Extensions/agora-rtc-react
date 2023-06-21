import{j as o,a as t,F as i}from"./jsx-runtime-670450c2.js";import{M as a,a as c}from"./index-23740aa8.js";import{u as s}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-7d2bb680.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const u=`### useLocalAudioTrack

用于创建本地麦克风音频轨道的 Hook。

- 在组件被销毁之前，该 Hook 只会创建一次音频轨道。
- 组件卸载后，创建的轨道会停止发布。

#### 参数

| 参数名             | 类型                             | 是否必选 | 描述                                                                                                                                                                                                                                       |
| ------------------ | -------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| \`ready\`            | \`boolean\`                        | 可选     | 是否准备好创建轨道，默认为 \`true\`。                                                                                                                                                                                                        |
| \`audioTrackConfig\` | \`MicrophoneAudioTrackInitConfig\` | 可选     | 麦克风音频轨道的初始化配置，默认为 \`{ ANS: true, AEC: true }\`。详见 [MicrophoneAudioTrackInitConfig](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/microphoneaudiotrackinitconfig.html)。 |
| \`client\`           | \`IAgoraRTCClient\`                | 可选     | [IAgoraRTCClient](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) 对象。                                                                                              |

#### 返回值

| 类型                                          | 描述                     |
| --------------------------------------------- | ------------------------ |
| \`IMicrophoneAudioTrack\` &VerticalLine; \`null\` | 本地麦克风音频轨道对象。 |

#### 使用示例

\`\`\`jsx
import { useLocalAudioTrack } from "agora-rtc-react";

function App() {
  const audioTrack = useLocalAudioTrack(true, { ANS: true, AEC: true });

  return <></>;
}
\`\`\`
`;function r(n){return t(i,{children:[o(a,{title:"hooks/useLocalAudioTrack"}),`
`,o(c,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:u})]})}function M(n={}){const{wrapper:e}=Object.assign({},s(),n.components);return e?o(e,Object.assign({},n,{children:o(r,n)})):r()}export{M as default};
//# sourceMappingURL=useLocalAudioTrack.en-US-3106cddf.js.map
