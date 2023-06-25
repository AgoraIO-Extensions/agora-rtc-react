import{j as e,a as r,F as s}from"./jsx-runtime-670450c2.js";import{M as i,a}from"./index-0eba151c.js";import{u as m}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-c77f45cb.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const c=`### useRemoteUsers

用于获取远端用户列表的 Hook。

- 当远端用户加入或离开时，更新该 hook 的返回值。
- 当远端用户改变身份时，更新该 hook 的返回值。

#### 参数

| 参数名   | 类型                                    | 是否必选 | 描述                                                                                                                                          |
| -------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| \`client\` | \`IAgoraRTCClient\` &VerticalLine; \`null\` | 可选     | [IAgoraRTCClient](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) 对象。 |

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
`;function o(n){return r(s,{children:[e(i,{title:"hooks/useRemoteUsers"}),`
`,e(a,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:c})]})}function j(n={}){const{wrapper:t}=Object.assign({},m(),n.components);return t?e(t,Object.assign({},n,{children:e(o,n)})):o()}export{j as default};
//# sourceMappingURL=useRemoteUsers.en-US-a5c1f6d2.js.map
