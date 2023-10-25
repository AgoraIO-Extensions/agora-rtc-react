import{j as r}from"./jsx-runtime-ffb262ed.js";import{a as b}from"./chunk-OPEUWD42-5eb1ab46.js";import{r as s}from"./index-76fb7be0.js";import{u as L,F as w,a as A}from"./styles-87cce120.js";import{F as x,L as C}from"./LocalAudioTrack-989cc4de.js";import{F as O,L as P}from"./LocalVideoTrack-8cb5f6c3.js";import{U as R,F as U,A as F}from"./useRTCClient-76870e69.js";import"./_commonjsHelpers-de833af9.js";import"./quick-mechanical-keyboard-14391-c203a4f2.js";import"./TrackBoundary-97d9068a.js";import"./local-track-3afbd068.js";import"./remote-audio-track-47d3517f.js";import"./remote-track-81128c7c.js";import"./remote-video-track-cf639b9f.js";class d extends O{static create(e){return new d(e)}async setDevice(e){console.log("[FakeCameraVideoTrack]: setDevice",e)}}class u extends x{static create(e){return new u(e)}async setDevice(e){console.log("[FakeMicrophoneAudioTrack]: setDevice",e)}}function m({micOn:c,cameraOn:e,audioTrack:i,videoTrack:l,playAudio:a,playVideo:n,volume:o,cover:p,children:k,style:v,...g}){const y=L(A,v);return n=n??!!e,a=a??!!c,r.jsxs("div",{...g,style:y,children:[r.jsx(P,{disabled:!e,play:n,track:l}),r.jsx(C,{disabled:!c,play:a,track:i,volume:o}),p&&!e&&r.jsx(R,{cover:p}),r.jsx("div",{style:w,children:k})]})}m.__docgenInfo={description:`This component plays the camera video track and the microphone audio track of the local user using the playback devices selected by the user in the browser.
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
\`\`\``,methods:[],displayName:"LocalUser",props:{micOn:{required:!1,tsType:{name:"boolean"},description:"`true`: Enable the local user's microphone.`false`: Disable the local user's microphone."},cameraOn:{required:!1,tsType:{name:"boolean"},description:"`true`: Enable the local user's camera.`false`: Disable the local user's camera."},audioTrack:{required:!1,tsType:{name:"union",raw:"T | PromiseLike<T>",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]},{name:"PromiseLike",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]}],raw:"PromiseLike<T>"}]},description:"The microphone audio track to be played, which can be created by calling [`useLocalMicrophoneTrack`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/functions/useLocalMicrophoneTrack.html)."},videoTrack:{required:!1,tsType:{name:"union",raw:"T | PromiseLike<T>",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]},{name:"PromiseLike",elements:[{name:"union",raw:"T | null | undefined",elements:[{name:"T"},{name:"null"},{name:"undefined"}]}],raw:"PromiseLike<T>"}]},description:"The camera video track to be played, which can be created by calling [`useLocalCameraTrack`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/functions/useLocalCameraTrack.html)."},playAudio:{required:!1,tsType:{name:"boolean"},description:"`true`: Play the local user's audio track.`false`: Stop playing the local user's audio track."},playVideo:{required:!1,tsType:{name:"boolean"},description:"`true`: Play the local user's video track.`false`: Stop playing the local user's video track."},volume:{required:!1,tsType:{name:"number"},description:"The volume. The value ranges from 0 (mute) to 1000 (maximum). A value of 100 is the original volume. When set to above 100, the SDK applies volume amplification using the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)."},cover:{required:!1,tsType:{name:"string"},description:"The cover image to be displayed when `playVideo` is `false`, replacing the video frame. You can pass the URL of an online image or the relative path of a local image."},children:{required:!1,tsType:{name:"ReactNode"},description:"The React nodes to be rendered."}},composes:["HTMLProps"]};const H={title:"User/LocalUser",component:m,parameters:{backgrounds:{default:"light"}}},t={args:{micOn:!1,cameraOn:!1,playVideo:!1,playAudio:!1,cover:"https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg",style:{width:288,height:216}},render:function({micOn:e,cameraOn:i,...l}){const[a]=s.useState(()=>U.create({publish:async()=>{b("IAgoraRTCClient.publish()")()}})),n=s.useMemo(()=>e?u.create():null,[e]),o=s.useMemo(()=>i?d.create():null,[i]);return s.useEffect(()=>{a&&n&&a.publish(n)},[a,n]),s.useEffect(()=>{a&&o&&a.publish(o)},[a,o]),r.jsx(F,{client:a,children:r.jsx(m,{audioTrack:n,cameraOn:i,micOn:e,videoTrack:o,...l})})}};var T,f,h;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
}`,...(h=(f=t.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const K=["Overview"];export{t as Overview,K as __namedExportsOrder,H as default};
//# sourceMappingURL=LocalUser.stories-00bb1b42.js.map
