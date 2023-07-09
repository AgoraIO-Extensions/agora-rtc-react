import{j as e,a as t,F as a}from"./jsx-runtime-670450c2.js";import{M as i,a as c}from"./index-44a0be6a.js";import{u as s}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-23ceae64.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const u=`## useVolumeLevel

用于自动获取音频轨道音量级别，自动获取的频率为每秒一次。

#### 参数

| 参数名       | 类型                                                                             | 是否必选 | 描述                                                                                                                            |
| ------------ | -------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| \`audioTrack\` | \`IRemoteAudioTrack\` &VerticalLine; \`ILocalAudioTrack\` &VerticalLine; \`undefined\` | 可选     | 本地或远端音频轨道，其中本地音频轨道通过 [useLocalMicrophoneTrack](#uselocalmicrophonetrack) 创建。如果未定义，则音量级别为 0。 |

#### 返回值

| 类型     | 描述                                                                                           |                                                      |
| -------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| \`number\` | 音频轨道的音量级别。取值范围 [0, 1]，1 代表理论最大音量。通常该值大于 0.6 代表用户在持续说话。 | TODO: 是指设备的最大音量，还是说发送信号的最大音量？ |

#### 使用示例

\`\`\`jsx
import { useVolumeLevel, useLocalMicrophoneTrack } from "agora-rtc-react";

function App() {
  const audioTrack = useLocalMicrophoneTrack();
  const volumeLevel = useVolumeLevel(audioTrack);

  return <div>{volumeLevel}</div>;
}
\`\`\`
`;function r(n){return t(a,{children:[e(i,{title:"hooks/useVolumeLevel"}),`
`,e(c,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:u})]})}function V(n={}){const{wrapper:o}=Object.assign({},s(),n.components);return o?e(o,Object.assign({},n,{children:e(r,n)})):r()}export{V as default};
//# sourceMappingURL=useVolumeLevel.en-US-89b623eb.js.map
