import{j as e,a,F as i}from"./jsx-runtime-670450c2.js";import{M as r,a as s}from"./index-23740aa8.js";import{u as c}from"./index-4fb8b842.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-7d2bb680.js";import"../sb-preview/runtime.mjs";import"./index-d475d2ea.js";import"./index-2d4beb60.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const m=`### useJoin

用于加入频道和管理本地音视频轨道的 Hook。支持在加入频道前执行异步操作,如获取 token 等。

#### 参数

| 参数名      | 类型                                            | 是否必选 | 描述                                                                                                                                          |
| ----------- | ----------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| \`fetchArgs\` | \`FetchArgs\` &VerticalLine; \`() => Promise<any>\` | 必选     | 获取加入频道所需参数的函数或对象。                                                                                                            |
| \`ready\`     | \`boolean\`                                       | 可选     | 是否准备好加入频道。默认为 \`true\`。                                                                                                           |
| \`client\`    | \`IAgoraRTCClient\`                               | 可选     | [IAgoraRTCClient](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) 对象。 |

#### 返回值

无。

#### 使用示例

\`\`\`jsx
import { useJoin } from "agora-rtc-react";

function App() {
  // you can use useJoin like this by passing a function as first argument.
  // useJoin(async () => {
  //   //you can do some actions like fetching token before calling join.
  //   const getData = await getToken();
  //   return getData;  The data type of getData must be fetchArgs
  // }, calling);

  useJoin(
    {
      appid: YOUR_APPID,
      channel: YOUR_CHANNEL,
      token: YOUR_TOKEN,
    },
    ready,
  );

  return <></>;
}
\`\`\`
`;function o(n){return a(i,{children:[e(r,{title:"hooks/useJoin"}),`
`,e(s,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:m})]})}function b(n={}){const{wrapper:t}=Object.assign({},c(),n.components);return t?e(t,Object.assign({},n,{children:e(o,n)})):o()}export{b as default};
//# sourceMappingURL=useJoin.en-US-97b5e191.js.map
