import{j as n}from"./jsx-runtime-94f6e698.js";import{M as t,d as i}from"./index-4ac64218.js";import{u as a}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-2e78a2bf.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const c=`## useVolumeLevel

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
`;function r(e){return n.jsxs(n.Fragment,{children:[n.jsx(t,{title:"hooks/useVolumeLevel"}),`
`,n.jsx(i,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:c})]})}function M(e={}){const{wrapper:o}=Object.assign({},a(),e.components);return o?n.jsx(o,Object.assign({},e,{children:n.jsx(r,e)})):r()}export{M as default};
//# sourceMappingURL=useVolumeLevel.en-US-e75cb831.js.map
