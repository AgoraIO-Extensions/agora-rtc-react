import{j as r}from"./jsx-runtime-94f6e698.js";import{a as g}from"./chunk-OPEUWD42-a3b45fd8.js";import{e as y,f as b}from"./TrackBoundary-2c41e911.js";import{r as s}from"./index-8db94870.js";import{u as L,F as w,a as A}from"./styles-8e94b0fb.js";import{L as C}from"./LocalAudioTrack-cc620bb2.js";import{L as x}from"./LocalVideoTrack-77933d47.js";import{U as O,F as P,A as R}from"./useRTCClient-baec1e01.js";import"./_commonjsHelpers-042e6b4d.js";import"./remote-video-track-c4e1b5cd.js";import"./remote-track-228b65b7.js";import"./remote-audio-track-7cafa4d8.js";function d({micOn:c,cameraOn:n,audioTrack:i,videoTrack:l,playAudio:e,playVideo:a,volume:o,cover:u,children:f,style:h,...k}){const v=L(A,h);return a=a??!!n,e=e??!!c,r.jsxs("div",{...k,style:v,children:[r.jsx(x,{disabled:!n,play:a,track:l}),r.jsx(C,{disabled:!c,play:e,track:i,volume:o}),u&&!n&&r.jsx(O,{cover:u}),r.jsx("div",{style:w,children:f})]})}d.__docgenInfo={description:`This component plays the camera video track and the microphone audio track of the local user using the playback devices selected by the user in the browser.
@example
\`\`\`jsx
import { LocalUser, useLocalAudioTrack, useLocalCameraTrack } from "agora-rtc-react";

function App() {
  const audioTrack = useLocalAudioTrack();
  const videoTrack = useLocalCameraTrack();

  return (
    <LocalUser
      audioTrack={audioTrack}
      cameraOn
      cover={COVER_IMAGE_URL}
      micOn
      playAudio
      playVideo
      videoTrack={videoTrack}
    />
  );
}
\`\`\``,methods:[],displayName:"LocalUser",props:{micOn:{required:!1,tsType:{name:"boolean"},description:"`true`: Enable the local user's microphone.`false`: Disable the local user's microphone."},cameraOn:{required:!1,tsType:{name:"boolean"},description:"`true`: Enable the local user's camera.`false`: Disable the local user's camera."},audioTrack:{required:!1,tsType:{name:"union",raw:"T | PromiseLike<T>",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]},{name:"PromiseLike",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]}],raw:"PromiseLike<T>"}]},description:"The microphone audio track to be played, which can be created by calling [`useLocalMicrophoneTrack`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/functions/useLocalMicrophoneTrack.html)."},videoTrack:{required:!1,tsType:{name:"union",raw:"T | PromiseLike<T>",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]},{name:"PromiseLike",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]}],raw:"PromiseLike<T>"}]},description:"The camera video track to be played, which can be created by calling [`useLocalCameraTrack`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/functions/useLocalCameraTrack.html)."},playAudio:{required:!1,tsType:{name:"boolean"},description:"`true`: Play the local user's audio track.`false`: Stop playing the local user's audio track."},playVideo:{required:!1,tsType:{name:"boolean"},description:"`true`: Play the local user's video track.`false`: Stop playing the local user's video track."},volume:{required:!1,tsType:{name:"number"},description:"The volume. The value ranges from 0 (mute) to 1000 (maximum). A value of 100 is the original volume. When set to above 100, the SDK applies volume amplification using the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)."},cover:{required:!1,tsType:{name:"string"},description:"The cover image to be displayed when `playVideo` is `false`, replacing the video frame. You can pass the URL of an online image or the relative path of a local image."},children:{required:!1,tsType:{name:"ReactNode"},description:"The React nodes to be rendered."}},composes:["HTMLProps"]};const N={title:"User/LocalUser",component:d,parameters:{backgrounds:{default:"light"}}},t={args:{micOn:!1,cameraOn:!1,playVideo:!1,playAudio:!1,cover:"https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg",style:{width:288,height:216}},render:function({micOn:n,cameraOn:i,...l}){const[e]=s.useState(()=>P.create({publish:async()=>{g("IAgoraRTCClient.publish()")()}})),a=s.useMemo(()=>n?y.create():null,[n]),o=s.useMemo(()=>i?b.create():null,[i]);return s.useEffect(()=>{e&&a&&e.publish(a)},[e,a]),s.useEffect(()=>{e&&o&&e.publish(o)},[e,o]),r.jsx(R,{client:e,children:r.jsx(d,{audioTrack:a,cameraOn:i,micOn:n,videoTrack:o,...l})})}};var m,p,T;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(T=(p=t.parameters)==null?void 0:p.docs)==null?void 0:T.source}}};const z=["Overview"];export{t as Overview,z as __namedExportsOrder,N as default};
//# sourceMappingURL=LocalUser.stories-2437de6a.js.map
