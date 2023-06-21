import{j as e,a as r,F as a}from"./jsx-runtime-670450c2.js";import{M as i,a as c}from"./index-23740aa8.js";import{u}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-7d2bb680.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const s=`### useVolumeLevel

用于获取音频轨道音量级别的 Hook, 它将会每秒更新一次音量级别。

#### 参数

| 参数名       | 类型                                                                             | 是否必选 | 描述                                             |
| ------------ | -------------------------------------------------------------------------------- | -------- | ------------------------------------------------ |
| \`audioTrack\` | \`IRemoteAudioTrack\` &VerticalLine; \`ILocalAudioTrack\` &VerticalLine; \`undefined\` | 可选     | 本地或远端音频轨道。如果未定义，则音量级别为 0。 |

#### 返回值

| 类型     | 描述                                |
| -------- | ----------------------------------- |
| \`number\` | 音频轨道的音量级别，范围从 0 到 1。 |

#### 使用示例

\`\`\`jsx
import { useVolumeLevel, useLocalAudioTrack } from "agora-rtc-react";

function App() {
  //create local audio track
  const audioTrack = useLocalAudioTrack();
  const volumeLevel = useVolumeLevel(audioTrack);

  return <div>{volumeLevel}</div>;
}
\`\`\`
`;function t(n){return r(a,{children:[e(i,{title:"hooks/useVolumeLevel"}),`
`,e(c,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:s})]})}function j(n={}){const{wrapper:o}=Object.assign({},u(),n.components);return o?e(o,Object.assign({},n,{children:e(t,n)})):t()}export{j as default};
//# sourceMappingURL=useVolumeLevel.en-US-e24291fb.js.map
