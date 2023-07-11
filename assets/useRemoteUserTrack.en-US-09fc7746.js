import{j as e}from"./jsx-runtime-94f6e698.js";import{M as o,d as i}from"./index-4ac64218.js";import{u as a}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-2e78a2bf.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const s='## useRemoteUserTrack\n\n用于获取远端用户音视频轨道。\n\n#### 参数\n\n| 参数名      | 类型                                             | 是否必选 | 描述                                                                                                                                                            |\n| ----------- | ------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| `user`      | `IAgoraRTCRemoteUser` &VerticalLine; `undefined` | 必选     | 远端用户对象。                                                                                                                                                  |\n| `mediaType` | `"video"` &VerticalLine; `"audio"`               | 必选     | 媒体类型，支持传入 `"video"` 或 `"audio"`。                                                                                                                     |\n| `client`    | `IAgoraRTCClient` &VerticalLine; `null`          | 可选     | 通过 Web SDK 的 [IAgoraRTC.createClient](https://docportal.shengwang.cn/cn/video-call-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createclient) 创建。 |\n\n#### 返回值\n\n返回一个包含以下属性的对象：\n| 属性 | 类型 | 描述 |\n| ----------------------| ---------------------- | ------------------------ |\n| `track` | `IRemoteVideoTrack` &VerticalLine; `IRemoteAudioTrack` &VerticalLine; `undefined` | 远端用户的音频或视频轨道（取决于传入的 `mediaType`）。如果远端用户或音频、视频轨道不存在，则返回 `undefined`。 |\n| `isLoading` | `boolean` |<li>`true`：正在执行获取轨道相关操作。</li><li>`false`：已经执行获取轨道相关操作，但不代表成功获取轨道。</li> |\n| `error` | `AgoraRTCReactError` &VerticalLine; `null` | 获取轨道成功则返回 `null`，获取轨道失败则抛出错误。错误详见 [AgoraRTCReactError](./data-types#agorartcreacterror)。|\n\n#### 使用示例\n\n```jsx\nimport { useRemoteUsers, useRemoteUserTrack } from "agora-rtc-react";\n\nfunction App() {\n  const remoteUsers = useRemoteUsers();\n\n  const videoTrack = useRemoteUserTrack(remoteUsers[0], "video");\n  const audioTrack = useRemoteUserTrack(remoteUsers[0], "audio");\n\n  return <></>;\n}\n```\n';function t(n){return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"hooks/useRemoteUserTrack"}),`
`,e.jsx(i,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:s})]})}function U(n={}){const{wrapper:r}=Object.assign({},a(),n.components);return r?e.jsx(r,Object.assign({},n,{children:e.jsx(t,n)})):t()}export{U as default};
//# sourceMappingURL=useRemoteUserTrack.en-US-09fc7746.js.map