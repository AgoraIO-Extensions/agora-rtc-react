import{j as e}from"./jsx-runtime-94f6e698.js";import{m as M,A as g,w as W,S as G}from"./TrackBoundary-2c41e911.js";import{r as n}from"./index-8db94870.js";import{F as q,A as H}from"./useRTCClient-baec1e01.js";import{R as x}from"./RemoteUser-4964849d.js";import"./_commonjsHelpers-042e6b4d.js";import"./remote-video-track-c4e1b5cd.js";import"./remote-track-228b65b7.js";import"./remote-audio-track-7cafa4d8.js";import"./styles-8e94b0fb.js";import"./RemoteAudioTrack-36ec51d7.js";import"./RemoteVideoTrack-2f52d62e.js";function B(r){const[t,o]=n.useState(0);return n.useEffect(()=>{if(r)return M(()=>{o(r.getVolumeLevel())},1e3)},[r]),t}const u=14,c=8,f=8,v=4;function T({volumeLevel:r=0,noise:t=.075,...o}){const[a,s]=n.useState(0);return n.useEffect(()=>{if(r&&t){const i=Math.max(0,Math.min(1,t)),d=setInterval(()=>{s(r+Math.random()*i*(Math.random()>.5?1:-1))},50);return()=>clearInterval(d)}},[r,t]),e.jsxs("svg",{fill:"none",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...o,children:[e.jsx("defs",{children:e.jsx("clipPath",{id:"icon-mic-v-clip",children:e.jsx("rect",{height:u,rx:c/2,width:c,x:f,y:v})})}),e.jsx("path",{d:"M0 0h24v24H0z",fill:"#999CA3",opacity:".01"}),e.jsx("rect",{clipPath:"url(#icon-mic-v-clip)",fill:"#fff",height:u,width:c,x:f,y:v}),e.jsx("path",{d:"M4 16.625h2v-1.25H4v1.25Zm6 4h4v-1.25h-4v1.25Zm8-4h2v-1.25h-2v1.25Zm-4 4A4.625 4.625 0 0 0 18.625 16h-1.25A3.375 3.375 0 0 1 14 19.375v1.25ZM5.375 16A4.625 4.625 0 0 0 10 20.625v-1.25A3.375 3.375 0 0 1 6.625 16h-1.25Z",fill:"#fff"}),e.jsx("g",{clipPath:"url(#icon-mic-v-clip)",children:e.jsx("rect",{fill:"#44AD00",height:u*2,style:{transform:`translateY(${(1-a)*u}px)`,transition:"transform .1s"},width:c,x:f,y:v})})]})}T.__docgenInfo={description:"",methods:[],displayName:"SVGMicrophone",props:{volumeLevel:{defaultValue:{value:"0",computed:!1},required:!1,tsType:{name:"number"},description:"0~1"},noise:{defaultValue:{value:"0.075",computed:!1},required:!1,tsType:{name:"number"},description:"0~1"}},composes:["SVGProps"]};const C=n.memo(function(t){return e.jsxs("svg",{fill:"none",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:[e.jsx("path",{d:"m5 5 14 14",stroke:"rgb(225, 225, 225, 0.35)",strokeLinejoin:"round",strokeWidth:"1.25"}),e.jsx("path",{clipRule:"evenodd",d:"M19.277 16.625H20v-1.25h-1.973l1.25 1.25Zm-3.239 2.065.89.89a4.602 4.602 0 0 1-2.716 1.04l-.212.005h-4a4.626 4.626 0 0 1-4.55-3.787l-.033-.213H4v-1.25h2c.345 0 .625.28.625.625a3.375 3.375 0 0 0 3.19 3.37l.185.005h4a3.36 3.36 0 0 0 2.038-.685Zm.587-4.717V8a4.625 4.625 0 0 0-8.5-2.526l.911.91a3.374 3.374 0 0 1 6.281.991H14v1.25h1.375v.75H14v1.25h1.375v.75h-1.348l1.25 1.25h.098v.098l1.25 1.25Zm-2.587 2.717.89.89A4.625 4.625 0 0 1 7.375 14v-3.973l1.25 1.25v.098h.098l1.25 1.25H8.625V14a3.375 3.375 0 0 0 5.413 2.69Z",fill:"rgb(225, 225, 225, 0.35)",fillRule:"evenodd"})]})});C.__docgenInfo={description:"",methods:[],displayName:"SVGMicrophoneMute"};const _=n.memo(function(t){return e.jsxs("svg",{fill:"none",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:[e.jsx("circle",{cx:"12",cy:"11",r:"7",stroke:"#fff",strokeLinejoin:"round",strokeWidth:"1.25"}),e.jsx("circle",{cx:"12",cy:"11",r:"3",stroke:"#fff",strokeLinejoin:"round",strokeWidth:"1.25"}),e.jsx("circle",{cx:"14.625",cy:"6.625",fill:"#fff",r:".625"}),e.jsx("path",{d:"M7 18.25a8.004 8.004 0 0 0 10 0",stroke:"#fff",strokeLinejoin:"round",strokeWidth:"1.25"})]})});_.__docgenInfo={description:"",methods:[],displayName:"SVGCamera"};const I=n.memo(function(t){return e.jsxs("svg",{fill:"none",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:[e.jsx("path",{d:"m5 5 14 14",stroke:"rgb(225, 225, 225, 0.35)",strokeLinejoin:"round",strokeWidth:"1.25"}),e.jsx("path",{clipRule:"evenodd",d:"m15.72 18.373.91.909a8.63 8.63 0 0 1-9.788-.364l-.232-.18.78-.976a7.38 7.38 0 0 0 8.33.61Zm2.434-2.87A7.625 7.625 0 0 0 7.497 4.846l.897.896a6.375 6.375 0 0 1 8.864 8.864l.896.897Zm-3.857 1.446.952.951A7.625 7.625 0 0 1 5.1 7.751l.951.952a6.375 6.375 0 0 0 8.246 8.246Zm.956-4.348a3.625 3.625 0 0 0-4.854-4.854l.964.964a2.378 2.378 0 0 1 2.926 2.926l.964.964Zm-.628-5.351a.625.625 0 1 0 0-1.25.625.625 0 0 0 0 1.25Z",fill:"rgb(225, 225, 225, 0.35)",fillRule:"evenodd"})]})});I.__docgenInfo={description:"",methods:[],displayName:"SVGCameraMute"};function L({noise:r,audioTrack:t,micOn:o,onMicChange:a,onClick:s,className:i="",...d}){const l=B(t),Z=n.useCallback(O=>{a==null||a(!o),s==null||s(O)},[a,s,o]);return e.jsx("button",{...d,className:`arr-user-control ${i}`,onClick:Z,children:o?e.jsx(T,{noise:r,volumeLevel:l}):e.jsx(C,{})})}L.__docgenInfo={description:"A button with microphone icon.\nDisplay realtime volume level when `audioTrack` is provided.",methods:[],displayName:"MicControl",props:{className:{defaultValue:{value:'""',computed:!1},required:!1},audioTrack:{required:!1,tsType:{name:"union",raw:"ILocalAudioTrack | IRemoteAudioTrack",elements:[{name:"ILocalAudioTrack"},{name:"IRemoteAudioTrack"}]},description:"Audio track to subscribe volume level."},micOn:{required:!1,tsType:{name:"boolean"},description:"Microphone is on."},onMicChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(micOn: boolean) => void",signature:{arguments:[{name:"micOn",type:{name:"boolean"}}],return:{name:"void"}}},description:"Callback when microphone is on/off."},noise:{required:!1,tsType:{name:"number"},description:"Add noise to volume level for a more organic effect."}},composes:["ButtonHTMLAttributes"]};function N({cameraOn:r,onCameraChange:t,onClick:o,className:a="",...s}){const i=n.useCallback(d=>{t==null||t(!r),o==null||o(d)},[t,o,r]);return e.jsx("button",{...s,className:`arr-user-control ${a}`,onClick:i,children:r?e.jsx(_,{}):e.jsx(I,{})})}N.__docgenInfo={description:"A button with camera icon.",methods:[],displayName:"CameraControl",props:{className:{defaultValue:{value:'""',computed:!1},required:!1},cameraOn:{required:!1,tsType:{name:"boolean"},description:"Camera is on."},onCameraChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(cameraOn: boolean) => void",signature:{arguments:[{name:"cameraOn",type:{name:"boolean"}}],return:{name:"void"}}},description:"Callback when camera is on/off."}},composes:["ButtonHTMLAttributes"]};const{useArgs:E}=__STORYBOOK_MODULE_PREVIEW_API__,oe={title:"User/RemoteUser",component:x,argTypes:{user:{control:{type:null}}},parameters:{backgrounds:{default:"light"}},decorators:[(r,t)=>{var s;const o=(s=t.args.user)==null?void 0:s.audioTrack;n.useEffect(()=>{if(o)return M(()=>{o.setVolume(G({min:0,max:100}))},2e3)},[o]);const[a]=n.useState(()=>q.create());return e.jsx(H,{client:a,children:r()})}]};function U(r){const{user:t}=r,[o]=n.useState(()=>t&&{...t});return e.jsx(x,{...r,user:o})}const p={args:{playVideo:!0,playAudio:!1,user:{uid:g(),hasVideo:!0,hasAudio:!0},style:{width:288,height:216}},render:U},m={parameters:{docs:{description:{story:"Show cover image if `playVideo` is `false`."}}},args:{user:{uid:g(),hasVideo:!0,hasAudio:!0},playVideo:!1,playAudio:!1,cover:"https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg",style:{width:288,height:216}},render:U},h={parameters:{docs:{description:{story:"Add buttons to control the video and audio track. Navigate to the story on the right sidebar and paly with it."}}},args:{user:{uid:g(),hasVideo:!0,hasAudio:!0},playVideo:!0,playAudio:!1,style:{borderRadius:8,width:288,height:216},cover:"https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"},render:function(t){const[o]=n.useState(()=>t.user&&{...t.user}),[a]=n.useState(W()),[,s]=E(),i=n.useCallback(l=>{s({playVideo:l})},[s]),d=n.useCallback(l=>{s({playAudio:l})},[s]);return e.jsx(x,{...t,user:o,children:e.jsxs("div",{style:{display:"flex",alignItems:"flex-end",boxSizing:"border-box",position:"absolute",left:0,bottom:0,width:"100%",padding:"4px 4px 4px 8px",color:"#fff"},children:[e.jsx("span",{style:{userSelect:"none"},children:a}),e.jsx(N,{cameraOn:t.playVideo,onCameraChange:i,style:{margin:"0 10px 0 auto"}}),e.jsx(L,{audioTrack:o==null?void 0:o.audioTrack,micOn:t.playAudio,onMicChange:d})]})})}};var y,w,A;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    playVideo: true,
    playAudio: false,
    user: {
      uid: randUuid(),
      hasVideo: true,
      hasAudio: true
    },
    style: {
      width: 288,
      height: 216
    }
  },
  render: RenderRemoteUser
}`,...(A=(w=p.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var b,V,j;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Show cover image if \`playVideo\` is \`false\`."
      }
    }
  },
  args: {
    user: {
      uid: randUuid(),
      hasVideo: true,
      hasAudio: true
    },
    playVideo: false,
    playAudio: false,
    cover: "https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg",
    style: {
      width: 288,
      height: 216
    }
  },
  render: RenderRemoteUser
}`,...(j=(V=m.parameters)==null?void 0:V.docs)==null?void 0:j.source}}};var k,S,R;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Add buttons to control the video and audio track. Navigate to the story on the right sidebar and paly with it."
      }
    }
  },
  args: {
    user: {
      uid: randUuid(),
      hasVideo: true,
      hasAudio: true
    },
    playVideo: true,
    playAudio: false,
    style: {
      borderRadius: 8,
      width: 288,
      height: 216
    },
    cover: "https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
  },
  render: function WithControls(args) {
    const [user] = useState<IAgoraRTCRemoteUser | undefined>(() => args.user && {
      ...args.user
    });
    const [userName] = useState(randFirstName());
    const [, updateArgs] = useArgs();
    const setVideo = useCallback((playVideo: boolean): void => {
      updateArgs({
        playVideo
      });
    }, [updateArgs]);
    const setAudio = useCallback((playAudio: boolean): void => {
      updateArgs({
        playAudio
      });
    }, [updateArgs]);
    return <RemoteUser {...args} user={user}>
        <div style={{
        display: "flex",
        alignItems: "flex-end",
        boxSizing: "border-box",
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        padding: "4px 4px 4px 8px",
        color: "#fff"
      }}>
          <span style={{
          userSelect: "none"
        }}>{userName}</span>
          <CameraControl cameraOn={args.playVideo} onCameraChange={setVideo} style={{
          margin: "0 10px 0 auto"
        }} />
          <MicControl audioTrack={user?.audioTrack} micOn={args.playAudio} onMicChange={setAudio} />
        </div>
      </RemoteUser>;
  }
}`,...(R=(S=h.parameters)==null?void 0:S.docs)==null?void 0:R.source}}};const re=["Overview","WithCover","WithControls"];export{p as Overview,h as WithControls,m as WithCover,re as __namedExportsOrder,oe as default};
//# sourceMappingURL=RemoteUser.stories-eaa1ff47.js.map
