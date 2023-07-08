import{j as o,a as r,F as e}from"./jsx-runtime-670450c2.js";import{M as i,a as c}from"./index-f240734c.js";import{u as s}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-cec1799b.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const u=`## useAutoPlayAudioTrack

用于控制本地或远端音频轨道。

- 当组件挂载时，该 Hook 会根据传入的 \`play\` 判断是否自动播放。
- 当组件卸载时，该 Hook 会停止播放 \`track\` 对应的音频轨道。

#### 参数

| 参数名  | 类型                                                   | 是否必选 | 描述                                                            |
| ------- | ------------------------------------------------------ | -------- | --------------------------------------------------------------- |
| \`track\` | \`IRemoteAudioTrack\` &VerticalLine; \`ILocalAudioTrack>\` | 必选     | 远端音频轨道对象或本地音频轨道对象。                            |
| \`play\`  | \`boolean\`                                              | 可选     | <li>\`true\`：播放该轨道。</li><li>\`false\`：停止播放该轨道。</li> |

#### 返回值

无。

#### 使用示例

\`\`\`jsx
import { useAutoPlayAudioTrack, useLocalMicrophoneTrack } from "agora-rtc-react";

function App() {
  const audioTrack = useLocalMicrophoneTrack();
  useAutoPlayAudioTrack(track, play);

  return <></>;
}
\`\`\`
`;function a(n){return r(e,{children:[o(i,{title:"hooks/useAutoPlayAudioTrack"}),`
`,o(c,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:u})]})}function j(n={}){const{wrapper:t}=Object.assign({},s(),n.components);return t?o(t,Object.assign({},n,{children:o(a,n)})):a()}export{j as default};
//# sourceMappingURL=useAutoPlayAudioTrack.en-US-2e027b0a.js.map
