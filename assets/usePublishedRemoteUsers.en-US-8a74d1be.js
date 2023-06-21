import{j as n,a as r,F as s}from"./jsx-runtime-670450c2.js";import{M as i,a}from"./index-23740aa8.js";import{u as m}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-7d2bb680.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const c=`### usePublishedRemoteUsers

用于获取远端用户列表的 Hook。

- 当远端用户发布或取消发布音频或视频轨道时，更新该 hook 的返回值。

#### 参数

| 参数名   | 类型                                    | 是否必选 | 描述                                                                                                                                          |
| -------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\` | \`IAgoraRTCClient\` &VerticalLine; \`null\` | 可选     | [IAgoraRTCClient](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) 对象。 |

#### 返回值

| 类型                    | 描述                                   |
| ----------------------- | -------------------------------------- |
| \`IAgoraRTCRemoteUser[]\` | 当前发布音频或视频轨道的远端用户列表。 |

#### 使用示例

\`\`\`jsx
import { usePublishedRemoteUsers } from "agora-rtc-react";

function App() {
  //get remote user list
  const publishedRemoteUsers = usePublishedRemoteUsers();

  return <></>;
}
\`\`\`
`;function o(e){return r(s,{children:[n(i,{title:"hooks/usePublishedRemoteUsers"}),`
`,n(a,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:c})]})}function U(e={}){const{wrapper:t}=Object.assign({},m(),e.components);return t?n(t,Object.assign({},e,{children:n(o,e)})):o()}export{U as default};
//# sourceMappingURL=usePublishedRemoteUsers.en-US-8a74d1be.js.map
