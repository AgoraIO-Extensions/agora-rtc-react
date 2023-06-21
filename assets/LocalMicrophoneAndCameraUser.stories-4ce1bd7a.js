import{a as w,j as i}from"./jsx-runtime-670450c2.js";import{a as b}from"./index-b50b194b.js";import{d as C,F as A}from"./TrackBoundary-a2d0821a.js";import{r as t}from"./index-f1f749bf.js";import{C as M}from"./CameraVideoTrack-49f6d3f0.js";import{M as O}from"./MicrophoneAudioTrack-d5599c6f.js";import{U as L,F as D,A as q}from"./UserCover-b66f58ee.js";import{u as P,F as R,a as F}from"./styles-7e450fee.js";import"./v4-a8fe6692.js";import"./_commonjsHelpers-042e6b4d.js";import"./index.esm-ac4cb3bc.js";import"./LocalVideoTrack-a4d02d18.js";import"./LocalAudioTrack-06928d48.js";import"./remote-video-track-895b354b.js";import"./remote-track-fdd11847.js";import"./remote-audio-track-2dbd11f6.js";function d({micOn:c,cameraOn:r,audioTrack:o,videoTrack:l,playAudio:e,playVideo:a,micDeviceId:n,cameraDeviceId:T,volume:h,cover:m,children:k,style:v,...y}){const g=P(F,v);return a=a??!!r,e=e??!!c,w("div",{...y,style:g,children:[i(M,{deviceId:T,disabled:!r,play:a,track:l}),i(O,{deviceId:n,disabled:!c,play:e,track:o,volume:h}),m&&!r&&i(L,{cover:m}),i("div",{style:R,children:k})]})}d.__docgenInfo={description:"Play/Stop local user camera and microphone track.",methods:[],displayName:"LocalMicrophoneAndCameraUser",props:{micOn:{required:!1,tsType:{name:"boolean"},description:"Whether to turn on the local user's microphone. Default false."},cameraOn:{required:!1,tsType:{name:"boolean"},description:"Whether to turn on the local user's camera. Default false."},audioTrack:{required:!1,tsType:{name:"union",raw:"T | PromiseLike<T>",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]},{name:"PromiseLike",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]}],raw:"PromiseLike<T>"}]},description:"A microphone audio track which can be created by `createMicrophoneAudioTrack()`."},videoTrack:{required:!1,tsType:{name:"union",raw:"T | PromiseLike<T>",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]},{name:"PromiseLike",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]}],raw:"PromiseLike<T>"}]},description:"A camera video track which can be created by `createCameraVideoTrack()`."},playAudio:{required:!1,tsType:{name:"boolean"},description:"Whether to play the local user's audio track. Default follows `micOn`."},playVideo:{required:!1,tsType:{name:"boolean"},description:"Whether to play the local user's video track. Default follows `cameraOn`."},micDeviceId:{required:!1,tsType:{name:"string"},description:"Device ID, which can be retrieved by calling `getDevices()`."},cameraDeviceId:{required:!1,tsType:{name:"string"},description:"Device ID, which can be retrieved by calling `getDevices()`."},volume:{required:!1,tsType:{name:"number"},description:"The volume. The value ranges from 0 (mute) to 1000 (maximum). A value of 100 is the current volume."},cover:{required:!1,tsType:{name:"string"},description:"Render cover image if playVideo is off."},children:{required:!1,tsType:{name:"ReactNode"},description:"Children is rendered on top of the video canvas."}},composes:["HTMLProps"]};const Q={title:"User/LocalMicrophoneAndCameraUser",component:d,tags:["autodocs"],parameters:{backgrounds:{default:"light"}}},s={args:{micOn:!1,cameraOn:!1,playVideo:!1,playAudio:!1,cover:"https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg",style:{width:288,height:216}},render:function({micOn:r,cameraOn:o,...l}){const[e]=t.useState(()=>D.create({publish:async()=>{b("IAgoraRTCClient.publish()")()}})),a=t.useMemo(()=>r?C.create():null,[r]),n=t.useMemo(()=>o?A.create():null,[o]);return t.useEffect(()=>{e&&a&&e.publish(a)},[e,a]),t.useEffect(()=>{e&&n&&e.publish(n)},[e,n]),i(q,{client:e,children:i(d,{audioTrack:a,cameraOn:o,micOn:r,videoTrack:n,...l})})}};var u,p,f;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
        <LocalMicrophoneAndCameraUser audioTrack={audioTrack} cameraOn={cameraOn} micOn={micOn} videoTrack={videoTrack} {...args} />
      </AgoraRTCProvider>;
  }
}`,...(f=(p=s.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};const X=["Overview"];export{s as Overview,X as __namedExportsOrder,Q as default};
//# sourceMappingURL=LocalMicrophoneAndCameraUser.stories-4ce1bd7a.js.map
