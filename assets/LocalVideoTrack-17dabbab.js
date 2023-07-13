import{j as m}from"./jsx-runtime-94f6e698.js";import{r as t}from"./index-8db94870.js";import{u,V as p}from"./styles-8e94b0fb.js";import{u as k,c as f}from"./TrackBoundary-b755f9d3.js";function h({track:n,play:o,disabled:a,muted:r,style:c,...s}){const i=u(p,c),[l,d]=t.useState(null),e=k(n);return f(e,o,l),t.useEffect(()=>{e&&a!=null&&e.setEnabled(!a).catch(console.warn)},[a,e]),t.useEffect(()=>{e&&r!=null&&e.setMuted(r).catch(console.warn)},[r,e]),m.jsx("div",{...s,ref:d,style:i})}h.__docgenInfo={description:`This component plays the local video track using the playback device selected by the user in the browser.
@example
\`\`\`jsx
import { LocalVideoTrack, useLocalCameraTrack } from "agora-rtc-react";

function App() {
  const videoTrack = useLocalCameraTrack();
  return <LocalVideoTrack track={videoTrack} play />;
}
\`\`\``,methods:[],displayName:"LocalVideoTrack",props:{track:{required:!1,tsType:{name:"union",raw:"T | PromiseLike<T>",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]},{name:"PromiseLike",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]}],raw:"PromiseLike<T>"}]},description:'The local video track to be played. Call [`IAgoraRTC.createScreenVideoTrack`](https://doc.shengwang.cn/api-ref/rtc/react/react-sdk/hooks#uselocalcameratrack">`useLocalCameraTrack`</a> or the Web SDK\'s <a href="https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createscreenvideotrack) method to create a local video track.'},play:{required:!1,tsType:{name:"boolean"},description:"`true`: Play the track.`false`: Stop playing the track."},disabled:{required:!1,tsType:{name:"boolean"},description:"`true`: Disable the track. When disabled, the SDK will stop playing and publishing the track.`false`: Enable the track."},muted:{required:!1,tsType:{name:"boolean"},description:"`true`: Pause sending media data of the track.`false`: Resume sending media data of the track."}},composes:["HTMLProps"]};export{h as L};
//# sourceMappingURL=LocalVideoTrack-17dabbab.js.map
