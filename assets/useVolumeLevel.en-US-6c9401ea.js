import{j as e}from"./jsx-runtime-ffb262ed.js";import{M as a,d as t}from"./index-1ca10796.js";import{u as i}from"./index-a1cf9e47.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-f0ff49a8.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-ffc7e5ff.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const c=`## useVolumeLevel

Returns the volume level of an audio track at a frequency of once per second.

#### Parameters

| Parameter    | Type                                                                             | Required | Description                                                                                                                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`audioTrack\` | \`IRemoteAudioTrack\` &VerticalLine; \`ILocalAudioTrack\` &VerticalLine; \`undefined\` | No       | The local or remote audio track. The local audio track can be created by calling [\`useLocalMicrophoneTrack\`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/functions/useLocalMicrophoneTrack.html). If undefined, the volume level is 0. |

#### Returns

| Type     | Description                                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| \`number\` | The volume level. The value range is [0,1]. 1 is the highest volume level. Usually a user with a volume level above 0.6 is a speaking user. |

#### Sample code

\`\`\`jsx
import { useVolumeLevel, useLocalMicrophoneTrack } from "agora-rtc-react";

function App() {
  const audioTrack = useLocalMicrophoneTrack();
  const volumeLevel = useVolumeLevel(audioTrack);

  return <div>{volumeLevel}</div>;
}
\`\`\`
`;function r(o){return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"hooks/useVolumeLevel"}),`
`,e.jsx(t,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:c})]})}function L(o={}){const{wrapper:n}=Object.assign({},i(),o.components);return n?e.jsx(n,Object.assign({},o,{children:e.jsx(r,o)})):r()}export{L as default};
//# sourceMappingURL=useVolumeLevel.en-US-6c9401ea.js.map
