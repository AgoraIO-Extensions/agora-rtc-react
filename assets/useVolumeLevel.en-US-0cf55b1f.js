import{j as e}from"./jsx-runtime-1a9d9a93.js";import{M as a,d as t}from"./index-19babe22.js";import{u as i}from"./index-4811e648.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-8982a7ce.js";import"../sb-preview/runtime.js";import"./index-a38d0dca.js";import"./index-8c3ac41d.js";import"./index-8fd8397b.js";import"./index-356e4a49.js";const c=`## useVolumeLevel

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
