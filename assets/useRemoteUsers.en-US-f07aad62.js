import{j as e,a as r,F as s}from"./jsx-runtime-670450c2.js";import{M as a,a as i}from"./index-44a0be6a.js";import{u as c}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-23ceae64.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const m=`## useRemoteUsers

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
`;function o(n){return r(s,{children:[e(a,{title:"hooks/useRemoteUsers"}),`
`,e(i,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:m})]})}function j(n={}){const{wrapper:t}=Object.assign({},c(),n.components);return t?e(t,Object.assign({},n,{children:e(o,n)})):o()}export{j as default};
//# sourceMappingURL=useRemoteUsers.en-US-f07aad62.js.map
