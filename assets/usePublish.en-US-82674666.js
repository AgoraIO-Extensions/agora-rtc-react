import{j as e}from"./jsx-runtime-94f6e698.js";import{M as n,d as a}from"./index-27aeb9e6.js";import{u as i}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-eee929ff.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const s='## usePublish\n\nThis hook lets you publish the local tracks when the component is ready and unpublish them when the component is unmounted.\n\n#### Parameters\n\n| Parameter        | Type                                                                                                                     | Required | Description                                                                                                                                          |\n| ---------------- | ------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |\n| `tracks`         | `(ILocalTrack` &VerticalLine; `null)[]`                                                                                  | Yes      | The list of local tracks.                                                                                                                            |\n| `readyToPublish` | `boolean`                                                                                                                | No       | Whether the local tracks are ready to publish. The default value is `true`.                                                                          |\n| `client`         | [`IAgoraRTCClient`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html) &VerticalLine; `null` | No       | Created using the Web SDK\'s [`IAgoraRTC.createClient`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method. |\n\n#### Returns\n\nReturns an object containing the following properties:\n\n| Property    | Type                                       | Description                                                                                                                                                                                                         |\n| ----------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| `isLoading` | `boolean`                                  | <li>`true`: The hook is performing operations related to publishing the tracks.</li><li>`false`: The hook completes operations related to publishing the tracks, but it does not indicate a successful result.</li> |\n| `error`     | `AgoraRTCReactError` &VerticalLine; `null` | Returns `null` if the tracks are successfully published, otherwise throws an error. See [`AgoraRTCReactError`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/classes/AgoraRTCReactError.html) for details.      |\n\n#### Sample code\n\n```jsx\nimport { useLocalMicrophoneTrack, useLocalCameraTrack, usePublish } from "agora-rtc-react";\n\nfunction App() {\n  // get audioTrack and videoTrack before publish\n  const audioTrack = useLocalMicrophoneTrack();\n  const videoTrack = useLocalCameraTrack();\n  usePublish([audioTrack, videoTrack]);\n\n  return <></>;\n}\n```\n';function o(r){return e.jsxs(e.Fragment,{children:[e.jsx(n,{title:"hooks/usePublish"}),`
`,e.jsx(a,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:s})]})}function g(r={}){const{wrapper:t}=Object.assign({},i(),r.components);return t?e.jsx(t,Object.assign({},r,{children:e.jsx(o,r)})):o()}export{g as default};
//# sourceMappingURL=usePublish.en-US-82674666.js.map