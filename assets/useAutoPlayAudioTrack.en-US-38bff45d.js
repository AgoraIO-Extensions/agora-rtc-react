import{j as n}from"./jsx-runtime-94f6e698.js";import{M as a,d as e}from"./index-4ac64218.js";import{u as i}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-2e78a2bf.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const c=`## useAutoPlayAudioTrack

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
`;function r(o){return n.jsxs(n.Fragment,{children:[n.jsx(a,{title:"hooks/useAutoPlayAudioTrack"}),`
`,n.jsx(e,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:c})]})}function f(o={}){const{wrapper:t}=Object.assign({},i(),o.components);return t?n.jsx(t,Object.assign({},o,{children:n.jsx(r,o)})):r()}export{f as default};
//# sourceMappingURL=useAutoPlayAudioTrack.en-US-38bff45d.js.map
