import{a as S,j as o}from"./jsx-runtime-670450c2.js";import"./TrackBoundary-a2d0821a.js";import{r as h}from"./index-f1f749bf.js";import{u as P,U as F,F as b,A as x}from"./UserCover-b66f58ee.js";import{R as A}from"./RemoteVideoTrack-7670afb5.js";import{u as I,F as q,a as _}from"./styles-7e450fee.js";import{F as n}from"./remote-video-track-895b354b.js";import"./index.esm-ac4cb3bc.js";import"./_commonjsHelpers-042e6b4d.js";import"./remote-audio-track-2dbd11f6.js";import"./remote-track-fdd11847.js";function i({track:e,playVideo:r,cover:t,client:v,style:R,children:V,...w}){var d,c;const k=I(_,R),T=(c=(d=P(v).remoteUsers)==null?void 0:d.find(C=>C.uid===(e==null?void 0:e.getUserId())))==null?void 0:c.hasVideo;return r=r??T,S("div",{...w,style:k,children:[o(A,{play:r,track:e}),t&&!r&&o(F,{cover:t}),o("div",{style:q,children:V})]})}i.__docgenInfo={description:"Subscribe and play remote user video track.\nAn `IRemoteVideoTrack` can only be own by one `RemoteVideoPlayer`.",methods:[],displayName:"RemoteVideoPlayer",props:{track:{required:!1,tsType:{name:"IRemoteVideoTrack"},description:"A remote track"},playVideo:{required:!1,tsType:{name:"boolean"},description:"Whether to play the remote user's video track. Default follows `user.hasVideo`."},cover:{required:!1,tsType:{name:"union",raw:"string | (() => ReactNode)",elements:[{name:"string"},{name:"unknown"}]},description:"Render cover image if playVideo is off."},children:{required:!1,tsType:{name:"ReactNode"},description:"Children is rendered on top of the video canvas."},client:{required:!1,tsType:{name:"union",raw:"IAgoraRTCClient | null",elements:[{name:"IAgoraRTCClient"},{name:"null"}]},description:"client instance"}},composes:["HTMLProps"]};const G={title:"Video/RemoteVideoPlayer",component:i,tags:["autodocs"],argTypes:{track:{control:{type:null}},client:{control:{type:null}}},parameters:{backgrounds:{default:"light"}},decorators:[e=>{const[r]=h.useState(()=>b.create());return o(x,{client:r,children:e()})}]};function g(e){const{track:r}=e,[t]=h.useState(()=>r?n.create():void 0);return o(i,{...e,track:t})}const a={parameters:{docs:{description:{story:"Show cover image if `playVideo` is `false`."}}},args:{playVideo:!0,track:n.create(),style:{width:288,height:216}},render:g},s={parameters:{docs:{description:{story:"Show cover image if `playVideo` is `false`."}}},args:{playVideo:!1,track:n.create(),cover:"https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg",style:{width:288,height:216}},render:g};var l,p,m;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Show cover image if \`playVideo\` is \`false\`."
      }
    }
  },
  args: {
    playVideo: true,
    track: FakeRemoteVideoTrack.create(),
    style: {
      width: 288,
      height: 216
    }
  },
  render: RenderRemoteVideoPlayer
}`,...(m=(p=a.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,y,f;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Show cover image if \`playVideo\` is \`false\`."
      }
    }
  },
  args: {
    playVideo: false,
    track: FakeRemoteVideoTrack.create(),
    cover: "https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg",
    style: {
      width: 288,
      height: 216
    }
  },
  render: RenderRemoteVideoPlayer
}`,...(f=(y=s.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};const J=["Overview","WithCover"];export{a as Overview,s as WithCover,J as __namedExportsOrder,G as default};
//# sourceMappingURL=RemoteVideoPlayer.stories-acbcd0c4.js.map
