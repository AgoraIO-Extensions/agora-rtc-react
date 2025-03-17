import{j as o}from"./jsx-runtime-1a9d9a93.js";import{M as a,d as r}from"./index-01974c7e.js";import{u as i}from"./index-4811e648.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-45288cab.js";import"../sb-preview/runtime.js";import"./index-a38d0dca.js";import"./index-1b441bc2.js";import"./index-8fd8397b.js";import"./index-356e4a49.js";const c=`## useAutoPlayAudioTrack

This hook lets you automatically play a local or remote audio track.

- When the component is mounted, this hook determines whether to automatically play the track according to the \`play\` parameter.
- When the component is unmounted, this hook stops playing the \`track\`.

#### Parameters

| Parameter | Type                                                  | Required | Description                                                               |
| --------- | ----------------------------------------------------- | -------- | ------------------------------------------------------------------------- |
| \`track\`   | \`IRemoteAudioTrack\` &VerticalLine; \`ILocalAudioTrack\` | Yes      | The local or remote audio track.                                          |
| \`play\`    | \`boolean\`                                             | No       | <li>\`true\`: Play the track.</li><li>\`false\`: Stop playing the track.</li> |

#### Returns

None.

#### Sample code

\`\`\`jsx
import { useAutoPlayAudioTrack, useLocalMicrophoneTrack } from "agora-rtc-react";

function App() {
  const audioTrack = useLocalMicrophoneTrack();
  useAutoPlayAudioTrack(track, play);

  return <></>;
}
\`\`\`
`;function n(t){return o.jsxs(o.Fragment,{children:[o.jsx(a,{title:"hooks/useAutoPlayAudioTrack"}),`
`,o.jsx(r,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:c})]})}function j(t={}){const{wrapper:e}=Object.assign({},i(),t.components);return e?o.jsx(e,Object.assign({},t,{children:o.jsx(n,t)})):n()}export{j as default};
