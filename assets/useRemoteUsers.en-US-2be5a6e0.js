import{j as n}from"./jsx-runtime-94f6e698.js";import{M as r,d as s}from"./index-4ac64218.js";import{u as i}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-2e78a2bf.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const a=`## useRemoteUsers

用于获取远端用户列表。

发生以下情况时，该 Hook 的返回值会更新：

- 远端用户加入或离开频道。
- 远端用户的角色改变（比如从主播变为观众）。
- 远端用户发布或取消发布音频或视频轨道。

#### 参数

| 参数名   | 类型                                    | 是否必选 | 描述                                                                                                                                                            |
| -------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\` | \`IAgoraRTCClient\` &VerticalLine; \`null\` | 可选     | 通过 Web SDK 的 [IAgoraRTC.createClient](https://docportal.shengwang.cn/cn/video-call-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createclient) 创建。 |

#### 返回值

| 类型                    | 描述           |
| ----------------------- | -------------- |
| \`IAgoraRTCRemoteUser[]\` | 远端用户列表。 |

#### 使用示例

\`\`\`jsx
import { useRemoteUsers } from "agora-rtc-react";

function App() {
  const remoteUsers = useRemoteUsers();

  return <></>;
}
\`\`\`
`;function o(e){return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"hooks/useRemoteUsers"}),`
`,n.jsx(s,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:a})]})}function C(e={}){const{wrapper:t}=Object.assign({},i(),e.components);return t?n.jsx(t,Object.assign({},e,{children:n.jsx(o,e)})):o()}export{C as default};
//# sourceMappingURL=useRemoteUsers.en-US-2be5a6e0.js.map
