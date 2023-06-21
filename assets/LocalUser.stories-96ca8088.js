import{a as y,j as o}from"./jsx-runtime-670450c2.js";import{a as g}from"./index-b50b194b.js";import{d as w,F as b}from"./TrackBoundary-a2d0821a.js";import{r as t}from"./index-f1f749bf.js";import{L}from"./LocalAudioTrack-06928d48.js";import{L as C}from"./LocalVideoTrack-a4d02d18.js";import{U as A,F as O,A as P}from"./UserCover-b66f58ee.js";import{u as R,F,a as q}from"./styles-7e450fee.js";import"./v4-a8fe6692.js";import"./_commonjsHelpers-042e6b4d.js";import"./index.esm-ac4cb3bc.js";import"./remote-video-track-895b354b.js";import"./remote-track-fdd11847.js";import"./remote-audio-track-2dbd11f6.js";function d({micOn:c,cameraOn:r,audioTrack:i,videoTrack:l,playAudio:e,playVideo:a,volume:n,cover:u,children:T,style:h,...k}){const v=R(q,h);return a=a??!!r,e=e??!!c,y("div",{...k,style:v,children:[o(C,{disabled:!r,play:a,track:l}),o(L,{disabled:!c,play:e,track:i,volume:n}),u&&!r&&o(A,{cover:u}),o("div",{style:F,children:T})]})}d.__docgenInfo={description:"Play/Stop local user camera and microphone track.",methods:[],displayName:"LocalUser",props:{micOn:{required:!1,tsType:{name:"boolean"},description:"Whether to turn on the local user's microphone. Default false."},cameraOn:{required:!1,tsType:{name:"boolean"},description:"Whether to turn on the local user's camera. Default false."},audioTrack:{required:!1,tsType:{name:"union",raw:"T | PromiseLike<T>",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]},{name:"PromiseLike",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]}],raw:"PromiseLike<T>"}]},description:"A microphone audio track which can be created by `createMicrophoneAudioTrack()`."},videoTrack:{required:!1,tsType:{name:"union",raw:"T | PromiseLike<T>",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]},{name:"PromiseLike",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]}],raw:"PromiseLike<T>"}]},description:"A camera video track which can be created by `createCameraVideoTrack()`."},playAudio:{required:!1,tsType:{name:"boolean"},description:"Whether to play the local user's audio track. Default follows `micOn`."},playVideo:{required:!1,tsType:{name:"boolean"},description:"Whether to play the local user's video track. Default follows `cameraOn`."},volume:{required:!1,tsType:{name:"number"},description:"The volume. The value ranges from 0 (mute) to 1000 (maximum). A value of 100 is the current volume."},cover:{required:!1,tsType:{name:"string"},description:"Render cover image if playVideo is off."},children:{required:!1,tsType:{name:"ReactNode"},description:"Children is rendered on top of the video canvas."}},composes:["HTMLProps"]};const z={title:"User/LocalUser",component:d,tags:["autodocs"],parameters:{backgrounds:{default:"light"}}},s={args:{micOn:!1,cameraOn:!1,playVideo:!1,playAudio:!1,cover:"https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg",style:{width:288,height:216}},render:function({micOn:r,cameraOn:i,...l}){const[e]=t.useState(()=>O.create({publish:async()=>{g("IAgoraRTCClient.publish()")()}})),a=t.useMemo(()=>r?w.create():null,[r]),n=t.useMemo(()=>i?b.create():null,[i]);return t.useEffect(()=>{e&&a&&e.publish(a)},[e,a]),t.useEffect(()=>{e&&n&&e.publish(n)},[e,n]),o(P,{client:e,children:o(d,{audioTrack:a,cameraOn:i,micOn:r,videoTrack:n,...l})})}};var m,p,f;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(f=(p=s.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};const G=["Overview"];export{s as Overview,G as __namedExportsOrder,z as default};
//# sourceMappingURL=LocalUser.stories-96ca8088.js.map
