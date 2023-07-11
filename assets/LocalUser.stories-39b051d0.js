import{j as r}from"./jsx-runtime-94f6e698.js";import{a as g}from"./chunk-OPEUWD42-a3b45fd8.js";import{e as y,f as w}from"./TrackBoundary-b755f9d3.js";import{r as s}from"./index-8db94870.js";import{u as L,F as b,a as A}from"./styles-8e94b0fb.js";import{L as C}from"./LocalAudioTrack-acfc79a7.js";import{L as x}from"./LocalVideoTrack-fa9ca59a.js";import{U as O,F as P,A as R}from"./useRTCClient-c3e6f1e0.js";import"./_commonjsHelpers-042e6b4d.js";import"./remote-video-track-2563c23b.js";import"./remote-track-f5a27496.js";import"./remote-audio-track-10a3ca7a.js";function d({micOn:l,cameraOn:n,audioTrack:i,videoTrack:c,playAudio:e,playVideo:a,volume:o,cover:u,children:T,style:k,...h}){const v=L(A,k);return a=a??!!n,e=e??!!l,r.jsxs("div",{...h,style:v,children:[r.jsx(x,{disabled:!n,play:a,track:c}),r.jsx(C,{disabled:!l,play:e,track:i,volume:o}),u&&!n&&r.jsx(O,{cover:u}),r.jsx("div",{style:b,children:T})]})}d.__docgenInfo={description:"该组件用于播放本地用户的摄像头视频轨道和麦克风音频轨道（不支持指定使用的媒体设备）。",methods:[],displayName:"LocalUser",props:{micOn:{required:!1,tsType:{name:"boolean"},description:"`true`：打开本地用户的麦克风。`false`：关闭本地用户的麦克风。"},cameraOn:{required:!1,tsType:{name:"boolean"},description:"`true`：打开本地用户的摄像头。`false`：关闭本地用户的摄像头。"},audioTrack:{required:!1,tsType:{name:"union",raw:"T | PromiseLike<T>",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]},{name:"PromiseLike",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]}],raw:"PromiseLike<T>"}]},description:"要播放的麦克风音频轨道。通过 [useLocalMicrophoneTrack](./hooks#uselocalmicrophonetrack) 创建。"},videoTrack:{required:!1,tsType:{name:"union",raw:"T | PromiseLike<T>",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]},{name:"PromiseLike",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]}],raw:"PromiseLike<T>"}]},description:"要播放的摄像头视频轨道。通过 [useLocalCameraTrack](./hooks#uselocalcameratrack) 创建。"},playAudio:{required:!1,tsType:{name:"boolean"},description:"`true`：播放本地用户的音频轨道。`false`：停止播放本地用户的音频轨道。"},playVideo:{required:!1,tsType:{name:"boolean"},description:"`true`：播放本地用户的视频轨道。`false`：停止播放本地用户的视频轨道。"},volume:{required:!1,tsType:{name:"number"},description:"音量大小。取值范围 [0, 1000]，0 代表静音，100 代表原始音量。100 以上会使用 [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) 进行音量增益。"},cover:{required:!1,tsType:{name:"string"},description:"当 `playVideo` 为 `false`时要渲染的封面图片，用于替代视频画面显示。支持传入在线图片的 URL 或本地图片的相对路径。"},children:{required:!1,tsType:{name:"ReactNode"},description:"需要展示的 React 节点。"}},composes:["HTMLProps"]};const z={title:"User/LocalUser",component:d,tags:["autodocs"],parameters:{backgrounds:{default:"light"}}},t={args:{micOn:!1,cameraOn:!1,playVideo:!1,playAudio:!1,cover:"https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg",style:{width:288,height:216}},render:function({micOn:n,cameraOn:i,...c}){const[e]=s.useState(()=>P.create({publish:async()=>{g("IAgoraRTCClient.publish()")()}})),a=s.useMemo(()=>n?y.create():null,[n]),o=s.useMemo(()=>i?w.create():null,[i]);return s.useEffect(()=>{e&&a&&e.publish(a)},[e,a]),s.useEffect(()=>{e&&o&&e.publish(o)},[e,o]),r.jsx(R,{client:e,children:r.jsx(d,{audioTrack:a,cameraOn:i,micOn:n,videoTrack:o,...c})})}};var m,p,f;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    micOn: false,
    cameraOn: false,
    playVideo: false,
    playAudio: false,
    cover: "https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg",
    style: {
      width: 288,
      height: 216
    }
  },
  render: function RenderLocalUser({
    micOn,
    cameraOn,
    ...args
  }: OverviewArgs) {
    const [client] = useState(() => FakeRTCClient.create({
      publish: async () => {
        action("IAgoraRTCClient.publish()")();
      }
    }));
    const audioTrack = useMemo(() => {
      return micOn ? FakeMicrophoneAudioTrack.create() : null;
    }, [micOn]);
    const videoTrack = useMemo(() => {
      return cameraOn ? FakeCameraVideoTrack.create() : null;
    }, [cameraOn]);
    useEffect(() => {
      if (client && audioTrack) {
        client.publish(audioTrack);
      }
    }, [client, audioTrack]);
    useEffect(() => {
      if (client && videoTrack) {
        client.publish(videoTrack);
      }
    }, [client, videoTrack]);
    return <AgoraRTCProvider client={client}>
        <LocalUser audioTrack={audioTrack} cameraOn={cameraOn} micOn={micOn} videoTrack={videoTrack} {...args} />
      </AgoraRTCProvider>;
  }
}`,...(f=(p=t.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};const B=["Overview"];export{t as Overview,B as __namedExportsOrder,z as default};
//# sourceMappingURL=LocalUser.stories-39b051d0.js.map
