import{j as e}from"./jsx-runtime-94f6e698.js";import{M as t,d as s}from"./index-4ac64218.js";import{u as a}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-2e78a2bf.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const i='## useRemoteVideoTracks\n\n用于自动订阅和获取远端用户视频轨道。\n\n- 当组件卸载时，该 Hook 会停止订阅 `users` 参数对应的远端用户视频轨道。\n- 当传入的 `users` 发生改变时，该 Hook 会更新订阅的视频轨道。\n\n#### 参数\n\n| 参数名   | 类型                                               | 是否必选 | 描述                                                                                                                                                            |\n| -------- | -------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| `users`  | `IAgoraRTCRemoteUser[]` &VerticalLine; `undefined` | 必选     | 远端用户列表。                                                                                                                                                  |\n| `client` | `IAgoraRTCClient` &VerticalLine; `null`            | 可选     | 通过 Web SDK 的 [IAgoraRTC.createClient](https://docportal.shengwang.cn/cn/video-call-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createclient) 创建。 |\n\n#### 返回值\n\n返回一个包含以下属性的对象：\n| 属性 | 类型 | 描述 |\n| ----------------------| ---------------------- | ------------------------ |\n| `videoTracks` | `IRemoteVideoTrack[]` | 已订阅的远端用户视频轨道列表。 |\n| `isLoading` | `boolean` |<li>`true`：正在执行订阅相关操作。</li><li>`false`：已经执行订阅相关操作，但不代表成功订阅。</li> |\n| `error` | `AgoraRTCReactError` &VerticalLine; `null` | 订阅成功则返回 `null`，订阅失败则抛出错误。错误详见 [AgoraRTCReactError](./data-types#agorartcreacterror)。 |\n\n#### 使用示例\n\n```jsx\nimport { useRemoteUsers, useRemoteVideoTracks } from "agora-rtc-react";\n\nfunction App() {\n  const remoteUsers = useRemoteUsers();\n  const videoTracks = useRemoteVideoTracks(remoteUsers);\n\n  return <></>;\n}\n```\n';function o(n){return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"hooks/useRemoteVideoTracks"}),`
`,e.jsx(s,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:i})]})}function x(n={}){const{wrapper:r}=Object.assign({},a(),n.components);return r?e.jsx(r,Object.assign({},n,{children:e.jsx(o,n)})):o()}export{x as default};
//# sourceMappingURL=useRemoteVideoTracks.en-US-fbdb6c25.js.map