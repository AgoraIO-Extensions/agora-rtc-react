import{j as n}from"./jsx-runtime-94f6e698.js";import{M as r,d as a}from"./index-4ac64218.js";import{u as i}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-2e78a2bf.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const c=`## useAutoPlayVideoTrack

用于控制本地或远端视频轨道。

- 当组件挂载时，该 Hook 会根据传入的 \`play\` 判断是否自动播放。
- 当组件卸载时，该 Hook 会停止播放 \`track\` 对应的视频轨道。

#### 参数

| 参数名  | 类型                                                  | 是否必选 | 描述                                                                                                   |
| ------- | ----------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| \`track\` | \`IRemoteVideoTrack\` &VerticalLine; \`ILocalVideoTrack\` | 必选     | 远端视频轨道对象或本地视频轨道对象。                                                                   |
| \`play\`  | \`boolean\`                                             | 可选     | <li>\`true\`：播放该轨道。</li><li>\`false\`：停止播放该轨道。</li>                                        |
| \`div\`   | \`HTMLElement\` &VerticalLine; \`null\`                   | 可选     | 用于渲染视频的 HTML 元素。如果提供了该参数，视频将在该元素中自动播放。如果未提供，则不会自动播放视频。 | TODO: 如果 play 为 true，div 不传，是否播放？ |

#### 返回值

无。

#### 使用示例

\`\`\`jsx
import { useAutoPlayVideoTrack, useLocalCameraTrack } from "agora-rtc-react";

function App() {
  const videoTrack = useLocalCameraTrack();
  useAutoPlayVideoTrack(track, play, div);

  return <></>;
}
\`\`\`
`;function t(o){return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"hooks/useAutoPlayVideoTrack"}),`
`,n.jsx(a,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:c})]})}function y(o={}){const{wrapper:e}=Object.assign({},i(),o.components);return e?n.jsx(e,Object.assign({},o,{children:n.jsx(t,o)})):t()}export{y as default};
//# sourceMappingURL=useAutoPlayVideoTrack.en-US-21bf91c5.js.map
