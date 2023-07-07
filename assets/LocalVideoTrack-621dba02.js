import{j as d}from"./jsx-runtime-670450c2.js";import{r as n}from"./index-f1f749bf.js";import{u,a as f}from"./styles-2f9d0643.js";import{u as p,e as T}from"./TrackBoundary-6e6b0a76.js";function k({track:t,play:s,disabled:a,muted:r,style:o,...i}){const c=u(f,o),[l,m]=n.useState(null),e=p(t);return T(e,s,l),n.useEffect(()=>{e&&a!=null&&e.setEnabled(!a).catch(console.warn)},[a,e]),n.useEffect(()=>{e&&r!=null&&e.setMuted(r).catch(console.warn)},[r,e]),d("div",{...i,ref:m,style:c})}k.__docgenInfo={description:"该组件用于播放本地视频轨道（不支持指定使用的媒体设备）。",methods:[],displayName:"LocalVideoTrack",props:{track:{required:!1,tsType:{name:"union",raw:"T | PromiseLike<T>",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]},{name:"PromiseLike",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]}],raw:"PromiseLike<T>"}]},description:'要播放的本地视频轨道。通过 [createScreenVideoTrack](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createcameravideotrack">createCameraVideoTrack</a> 或 <a href="https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createscreenvideotrack) 创建。'},play:{required:!1,tsType:{name:"boolean"},description:"`true`：播放该轨道。`false`：停止播放该轨道。"},disabled:{required:!1,tsType:{name:"boolean"},description:"`true`：禁用该轨道。禁用后，SDK 将停止播放和发布该轨道。`false`：启用该轨道。"},muted:{required:!1,tsType:{name:"boolean"},description:"`true`：暂停发送该轨道的媒体数据。`false`：恢复发送该轨道的媒体数据。"}},composes:["HTMLProps"]};export{k as L};
//# sourceMappingURL=LocalVideoTrack-621dba02.js.map
