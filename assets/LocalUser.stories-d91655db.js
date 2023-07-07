import{a as v,j as i}from"./jsx-runtime-670450c2.js";import{a as w}from"./index-b50b194b.js";import{a as y,b}from"./TrackBoundary-6e6b0a76.js";import{r as s}from"./index-f1f749bf.js";import{u as A,F as L,V as C}from"./styles-2f9d0643.js";import{L as P}from"./LocalAudioTrack-3c85d25a.js";import{L as O}from"./LocalVideoTrack-621dba02.js";import{U as R,F as U,A as q}from"./useRTCClient-8da5010b.js";import"./v4-a8fe6692.js";import"./_commonjsHelpers-042e6b4d.js";import"./remote-video-track-5f739a1e.js";import"./remote-track-7856421c.js";import"./remote-audio-track-150b84d8.js";function d({micOn:c,cameraOn:n,audioTrack:o,videoTrack:l,playAudio:e,playVideo:a,volume:r,cover:m,children:T,style:k,...g}){const h=A(C,k);return a=a??!!n,e=e??!!c,v("div",{...g,style:h,children:[i(O,{disabled:!n,play:a,track:l}),i(P,{disabled:!c,play:e,track:o,volume:r}),m&&!n&&i(R,{cover:m}),i("div",{style:L,children:T})]})}d.__docgenInfo={description:"该组件用于播放本地用户的摄像头视频轨道和麦克风音频轨道（不支持指定使用的媒体设备）。",methods:[],displayName:"LocalUser",props:{micOn:{required:!1,tsType:{name:"boolean"},description:"`true`：打开本地用户的麦克风。`false`：关闭本地用户的麦克风。"},cameraOn:{required:!1,tsType:{name:"boolean"},description:"`true`：打开本地用户的摄像头。`false`：关闭本地用户的摄像头。"},audioTrack:{required:!1,tsType:{name:"union",raw:"T | PromiseLike<T>",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]},{name:"PromiseLike",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]}],raw:"PromiseLike<T>"}]},description:"要播放的麦克风音频轨道。通过 [createMicrophoneAudioTrack](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createmicrophoneaudiotrack) 创建。"},videoTrack:{required:!1,tsType:{name:"union",raw:"T | PromiseLike<T>",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]},{name:"PromiseLike",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]}],raw:"PromiseLike<T>"}]},description:"要播放的摄像头视频轨道。通过 [createCameraVideoTrack](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createcameravideotrack) 创建。"},playAudio:{required:!1,tsType:{name:"boolean"},description:"`true`：播放本地用户的音频轨道。`false`：停止播放本地用户的音频轨道。"},playVideo:{required:!1,tsType:{name:"boolean"},description:"`true`：播放本地用户的视频轨道。`false`：停止播放本地用户的视频轨道。"},volume:{required:!1,tsType:{name:"number"},description:"音量大小。取值范围 [0, 1000]，0 代表静音，100 代表原始音量。100 以上会使用 [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) 进行音量增益。"},cover:{required:!1,tsType:{name:"string"},description:"当 `playVideo` 为 `false`时要渲染的封面图片，用于替代视频画面显示。"},children:{required:!1,tsType:{name:"ReactNode"},description:"需要展示的 React 节点。"}},composes:["HTMLProps"]};const H={title:"User/LocalUser",component:d,tags:["autodocs"],parameters:{backgrounds:{default:"light"}}},t={args:{micOn:!1,cameraOn:!1,playVideo:!1,playAudio:!1,cover:"https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg",style:{width:288,height:216}},render:function({micOn:n,cameraOn:o,...l}){const[e]=s.useState(()=>U.create({publish:async()=>{w("IAgoraRTCClient.publish()")()}})),a=s.useMemo(()=>n?y.create():null,[n]),r=s.useMemo(()=>o?b.create():null,[o]);return s.useEffect(()=>{e&&a&&e.publish(a)},[e,a]),s.useEffect(()=>{e&&r&&e.publish(r)},[e,r]),i(q,{client:e,children:i(d,{audioTrack:a,cameraOn:o,micOn:n,videoTrack:r,...l})})}};var u,p,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(f=(p=t.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};const D=["Overview"];export{t as Overview,D as __namedExportsOrder,H as default};
//# sourceMappingURL=LocalUser.stories-d91655db.js.map
