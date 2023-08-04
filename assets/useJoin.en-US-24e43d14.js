import{j as e}from"./jsx-runtime-94f6e698.js";import{M as r,d as i}from"./index-01308511.js";import{u as a}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-dbb49c37.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-80ae7d84.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const s='## useJoin\n\nThis hook lets a user automatically join a channel when the component is ready and automatically leaves the channel when the component is unmounted.\n\nYou can customize the conditions required to join a channel using `fetchArgs`. For example, generating a token and other asynchronous operations can be performed before joining the channel.\n\n#### Parameters\n\n| Parameter   | Type                                                                                               | Required | Description                                                                                                                                                                           |\n| ----------- | -------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| `fetchArgs` | `JoinOptions` &VerticalLine; `(() => Promise<JoinOptions>)`                                        | Required | The parameters or asynchronous function required to join the channel. See [`JoinOptions`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/interfaces/JoinOptions.html) for details. |\n| `ready`     | `boolean`                                                                                          | No       | Whether the user is ready to join the channel. The default value is `true`.                                                                                                           |\n| `client`    | [`IAgoraRTCClient`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html) | No       | Created using the Web SDK\'s [`IAgoraRTC.createClient`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method.                                  |\n\n#### Returns\n\nReturns an object containing the following properties:\n\n| Property      | Type                                       | Description                                                                                                                                                                                                      |\n| ------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| `data`        | `UID`                                      | The user ID if the user successfully joins the channel. If you does not specify a `uid` when passing `fetchArgs`, the default value `0` is returned.                                                             |\n| `isLoading`   | `boolean`                                  | <li>`true`: The hook is performing operations related to joining the channel.</li><li>`false`: The hook completes operations related to joining the channel, but it does not indicate a successful result.</li>  |\n| `isConnected` | `boolean`                                  | <li>`true`: The SDK is connected to the server, indicating that the user successfully joins the channel.</li><li>`false`: The SDK is not connected to the server.</li>                                           |\n| `error`       | `AgoraRTCReactError` &VerticalLine; `null` | Returns `null` if the user successfully joins the channel, otherwise throws an error. See [`AgoraRTCReactError`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/classes/AgoraRTCReactError.html) for details. |\n\n#### Sample code\n\n```jsx\nimport { useJoin } from "agora-rtc-react";\n\nfunction App() {\n  // Example: passing a function as first argument\n  // useJoin(async () => {\n  //   Fetch the token before joining the channel. Note that the data type of getData must be fetchArgs\n  //   const getData = await getToken();\n  //   return getData;\n  // }, calling);\n\n  useJoin(\n    {\n      appid: YOUR_APPID,\n      channel: YOUR_CHANNEL,\n      token: YOUR_TOKEN,\n    },\n    ready,\n  );\n\n  return <></>;\n}\n```\n';function o(n){return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"hooks/useJoin"}),`
`,e.jsx(i,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:s})]})}function R(n={}){const{wrapper:t}=Object.assign({},a(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(o,n)})):o()}export{R as default};
//# sourceMappingURL=useJoin.en-US-24e43d14.js.map
