import{j as r}from"./jsx-runtime-670450c2.js";import{r as i}from"./index-f1f749bf.js";import{L as o}from"./LocalVideoTrack-a4d02d18.js";import{u as s}from"./TrackBoundary-a2d0821a.js";function d({track:t,deviceId:e,...n}){const a=s(t);return i.useEffect(()=>{a&&e!=null&&a.setDevice(e).catch(console.warn)},[e,a]),r(o,{track:t,...n})}d.__docgenInfo={description:"A component which renders a camera video track, with device options.\n\n```jsx\nconst track = useMemo(() => AgoraRTC.createCameraVideoTrack(), [])\nreturn <CameraVideoTrack track={track} play />\n```",methods:[],displayName:"CameraVideoTrack",props:{track:{required:!1,tsType:{name:"union",raw:"T | PromiseLike<T>",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]},{name:"PromiseLike",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]}],raw:"PromiseLike<T>"}]},description:"A local video track which can be created by `createCameraVideoTrack()` or `createScreenVideoTrack()`."},play:{required:!1,tsType:{name:"boolean"},description:"Whether to play the track."},disabled:{required:!1,tsType:{name:"boolean"},description:`Enable or disable the track.

If a track is disabled, the SDK stops playing and publishing the track.`},muted:{required:!1,tsType:{name:"boolean"},description:"Sends or stops sending the media data of the track.\n\n- Setting `muted` does not stop capturing video and takes shorter time to take effect than `disabled`. For details, see [What are the differences between setEnabled and setMuted?](https://docs.agora.io/en/Interactive%20Broadcast/faq/differences_between_setenabled_and_setmuted).\n- Do not use `disabled` and `muted` together."},deviceId:{required:!1,tsType:{name:"string"},description:"Device ID, which can be retrieved by calling `getDevices()`."}},composes:["HTMLProps"]};export{d as C};
//# sourceMappingURL=CameraVideoTrack-49f6d3f0.js.map