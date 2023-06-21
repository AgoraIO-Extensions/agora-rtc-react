import{j as o,a as r,F as e}from"./jsx-runtime-670450c2.js";import{M as i,a as c}from"./index-23740aa8.js";import{u}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-7d2bb680.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const s=`### useAutoPlayAudioTrack

用于控制本地或远端视频轨道的 Hook。

- 组件在加载时,会根据传入的 \`play\` 判断是否自动播放。
- 组件在卸载时,如果 \`track\` 正在播放,则停止播放视频轨道。

#### 参数

| 参数名  | 类型                                                   | 是否必选 | 描述                                 |
| ------- | ------------------------------------------------------ | -------- | ------------------------------------ |
| \`track\` | \`IRemoteAudioTrack\` &VerticalLine; \`ILocalAudioTrack>\` | 必选     | 远端音频轨道对象或本地音频轨道对象。 |
| \`play\`  | \`boolean\`                                              | 可选     | 是否播放音频轨道。                   |

#### 返回值

无。

#### 使用示例

\`\`\`jsx
import { useAutoPlayAudioTrack, useLocalAudioTrack } from "agora-rtc-react";

function App() {
  //get audioTrack
  const audioTrack = useLocalAudioTrack();
  useAutoPlayAudioTrack(track, play);

  return <></>;
}
\`\`\`
`;function t(n){return r(e,{children:[o(i,{title:"hooks/useAutoPlayAudioTrack"}),`
`,o(c,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:s})]})}function L(n={}){const{wrapper:a}=Object.assign({},u(),n.components);return a?o(a,Object.assign({},n,{children:o(t,n)})):t()}export{L as default};
//# sourceMappingURL=useAutoPlayAudioTrack.en-US-afa00fdc.js.map
