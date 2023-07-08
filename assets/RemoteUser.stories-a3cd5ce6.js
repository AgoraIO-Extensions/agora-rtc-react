import{a as u,j as t}from"./jsx-runtime-670450c2.js";import{i as C,A as y,w as q,S as H}from"./TrackBoundary-6e6b0a76.js";import{r as a}from"./index-f1f749bf.js";import{F as B,A as j}from"./useRTCClient-8da5010b.js";import{R as w}from"./RemoteUser-bda93cbd.js";import"./_commonjsHelpers-042e6b4d.js";import"./remote-video-track-5f739a1e.js";import"./remote-track-7856421c.js";import"./remote-audio-track-150b84d8.js";import"./styles-2f9d0643.js";import"./RemoteAudioTrack-ad16e331.js";import"./RemoteVideoTrack-a3202365.js";function E(r){const[e,o]=a.useState(0);return a.useEffect(()=>{if(r)return C(()=>{o(r.getVolumeLevel())},1e3)},[r]),e}const c=14,p=8,v=8,g=4;function _({volumeLevel:r=0,noise:e=.075,...o}){const[s,n]=a.useState(0);return a.useEffect(()=>{if(r&&e){const i=Math.max(0,Math.min(1,e)),d=setInterval(()=>{n(r+Math.random()*i*(Math.random()>.5?1:-1))},50);return()=>clearInterval(d)}},[r,e]),u("svg",{fill:"none",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...o,children:[t("defs",{children:t("clipPath",{id:"icon-mic-v-clip",children:t("rect",{height:c,rx:p/2,width:p,x:v,y:g})})}),t("path",{d:"M0 0h24v24H0z",fill:"#999CA3",opacity:".01"}),t("rect",{clipPath:"url(#icon-mic-v-clip)",fill:"#fff",height:c,width:p,x:v,y:g}),t("path",{d:"M4 16.625h2v-1.25H4v1.25Zm6 4h4v-1.25h-4v1.25Zm8-4h2v-1.25h-2v1.25Zm-4 4A4.625 4.625 0 0 0 18.625 16h-1.25A3.375 3.375 0 0 1 14 19.375v1.25ZM5.375 16A4.625 4.625 0 0 0 10 20.625v-1.25A3.375 3.375 0 0 1 6.625 16h-1.25Z",fill:"#fff"}),t("g",{clipPath:"url(#icon-mic-v-clip)",children:t("rect",{fill:"#44AD00",height:c*2,style:{transform:`translateY(${(1-s)*c}px)`,transition:"transform .1s"},width:p,x:v,y:g})})]})}_.__docgenInfo={description:"",methods:[],displayName:"SVGMicrophone",props:{volumeLevel:{defaultValue:{value:"0",computed:!1},required:!1,tsType:{name:"number"},description:"0~1"},noise:{defaultValue:{value:"0.075",computed:!1},required:!1,tsType:{name:"number"},description:"0~1"}},composes:["SVGProps"]};const I=a.memo(function(e){return u("svg",{fill:"none",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...e,children:[t("path",{d:"m5 5 14 14",stroke:"rgb(225, 225, 225, 0.35)",strokeLinejoin:"round",strokeWidth:"1.25"}),t("path",{clipRule:"evenodd",d:"M19.277 16.625H20v-1.25h-1.973l1.25 1.25Zm-3.239 2.065.89.89a4.602 4.602 0 0 1-2.716 1.04l-.212.005h-4a4.626 4.626 0 0 1-4.55-3.787l-.033-.213H4v-1.25h2c.345 0 .625.28.625.625a3.375 3.375 0 0 0 3.19 3.37l.185.005h4a3.36 3.36 0 0 0 2.038-.685Zm.587-4.717V8a4.625 4.625 0 0 0-8.5-2.526l.911.91a3.374 3.374 0 0 1 6.281.991H14v1.25h1.375v.75H14v1.25h1.375v.75h-1.348l1.25 1.25h.098v.098l1.25 1.25Zm-2.587 2.717.89.89A4.625 4.625 0 0 1 7.375 14v-3.973l1.25 1.25v.098h.098l1.25 1.25H8.625V14a3.375 3.375 0 0 0 5.413 2.69Z",fill:"rgb(225, 225, 225, 0.35)",fillRule:"evenodd"})]})});I.__docgenInfo={description:"",methods:[],displayName:"SVGMicrophoneMute"};const L=a.memo(function(e){return u("svg",{fill:"none",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...e,children:[t("circle",{cx:"12",cy:"11",r:"7",stroke:"#fff",strokeLinejoin:"round",strokeWidth:"1.25"}),t("circle",{cx:"12",cy:"11",r:"3",stroke:"#fff",strokeLinejoin:"round",strokeWidth:"1.25"}),t("circle",{cx:"14.625",cy:"6.625",fill:"#fff",r:".625"}),t("path",{d:"M7 18.25a8.004 8.004 0 0 0 10 0",stroke:"#fff",strokeLinejoin:"round",strokeWidth:"1.25"})]})});L.__docgenInfo={description:"",methods:[],displayName:"SVGCamera"};const N=a.memo(function(e){return u("svg",{fill:"none",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...e,children:[t("path",{d:"m5 5 14 14",stroke:"rgb(225, 225, 225, 0.35)",strokeLinejoin:"round",strokeWidth:"1.25"}),t("path",{clipRule:"evenodd",d:"m15.72 18.373.91.909a8.63 8.63 0 0 1-9.788-.364l-.232-.18.78-.976a7.38 7.38 0 0 0 8.33.61Zm2.434-2.87A7.625 7.625 0 0 0 7.497 4.846l.897.896a6.375 6.375 0 0 1 8.864 8.864l.896.897Zm-3.857 1.446.952.951A7.625 7.625 0 0 1 5.1 7.751l.951.952a6.375 6.375 0 0 0 8.246 8.246Zm.956-4.348a3.625 3.625 0 0 0-4.854-4.854l.964.964a2.378 2.378 0 0 1 2.926 2.926l.964.964Zm-.628-5.351a.625.625 0 1 0 0-1.25.625.625 0 0 0 0 1.25Z",fill:"rgb(225, 225, 225, 0.35)",fillRule:"evenodd"})]})});N.__docgenInfo={description:"",methods:[],displayName:"SVGCameraMute"};function U({noise:r,audioTrack:e,micOn:o,onMicChange:s,onClick:n,className:i="",...d}){const l=E(e),W=a.useCallback(G=>{s==null||s(!o),n==null||n(G)},[s,n,o]);return t("button",{...d,className:`arr-user-control ${i}`,onClick:W,children:o?t(_,{noise:r,volumeLevel:l}):t(I,{})})}U.__docgenInfo={description:"A button with microphone icon.\nDisplay realtime volume level when `audioTrack` is provided.",methods:[],displayName:"MicControl",props:{className:{defaultValue:{value:'""',computed:!1},required:!1},audioTrack:{required:!1,tsType:{name:"union",raw:"ILocalAudioTrack | IRemoteAudioTrack",elements:[{name:"ILocalAudioTrack"},{name:"IRemoteAudioTrack"}]},description:"Audio track to subscribe volume level."},micOn:{required:!1,tsType:{name:"boolean"},description:"Microphone is on."},onMicChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(micOn: boolean) => void",signature:{arguments:[{name:"micOn",type:{name:"boolean"}}],return:{name:"void"}}},description:"Callback when microphone is on/off."},noise:{required:!1,tsType:{name:"number"},description:"Add noise to volume level for a more organic effect."}},composes:["ButtonHTMLAttributes"]};function Z({cameraOn:r,onCameraChange:e,onClick:o,className:s="",...n}){const i=a.useCallback(d=>{e==null||e(!r),o==null||o(d)},[e,o,r]);return t("button",{...n,className:`arr-user-control ${s}`,onClick:i,children:r?t(L,{}):t(N,{})})}Z.__docgenInfo={description:"A button with camera icon.",methods:[],displayName:"CameraControl",props:{className:{defaultValue:{value:'""',computed:!1},required:!1},cameraOn:{required:!1,tsType:{name:"boolean"},description:"Camera is on."},onCameraChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(cameraOn: boolean) => void",signature:{arguments:[{name:"cameraOn",type:{name:"boolean"}}],return:{name:"void"}}},description:"Callback when camera is on/off."}},composes:["ButtonHTMLAttributes"]};const{useArgs:P}=__STORYBOOK_MODULE_PREVIEW_API__,re={title:"User/RemoteUser",component:w,tags:["autodocs"],argTypes:{user:{control:{type:null}}},parameters:{backgrounds:{default:"light"}},decorators:[(r,e)=>{var n;const o=(n=e.args.user)==null?void 0:n.audioTrack;a.useEffect(()=>{if(o)return C(()=>{o.setVolume(H({min:0,max:100}))},2e3)},[o]);const[s]=a.useState(()=>B.create());return t(j,{client:s,children:r()})}]};function O(r){const{user:e}=r,[o]=a.useState(()=>e&&{...e});return t(w,{...r,user:o})}const m={args:{playVideo:!0,playAudio:!1,user:{uid:y(),hasVideo:!0,hasAudio:!0},style:{width:288,height:216}},render:O},h={parameters:{docs:{description:{story:"Show cover image if `playVideo` is `false`."}}},args:{user:{uid:y(),hasVideo:!0,hasAudio:!0},playVideo:!1,playAudio:!1,cover:"https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg",style:{width:288,height:216}},render:O},f={parameters:{docs:{description:{story:"Add buttons to control the video and audio track. Navigate to the story on the right sidebar and paly with it."}}},args:{user:{uid:y(),hasVideo:!0,hasAudio:!0},playVideo:!0,playAudio:!1,style:{borderRadius:8,width:288,height:216},cover:"https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"},render:function(e){const[o]=a.useState(()=>e.user&&{...e.user}),[s]=a.useState(q()),[,n]=P(),i=a.useCallback(l=>{n({playVideo:l})},[n]),d=a.useCallback(l=>{n({playAudio:l})},[n]);return t(w,{...e,user:o,children:u("div",{style:{display:"flex",alignItems:"flex-end",boxSizing:"border-box",position:"absolute",left:0,bottom:0,width:"100%",padding:"4px 4px 4px 8px",color:"#fff"},children:[t("span",{style:{userSelect:"none"},children:s}),t(Z,{cameraOn:e.playVideo,onCameraChange:i,style:{margin:"0 10px 0 auto"}}),t(U,{audioTrack:o==null?void 0:o.audioTrack,micOn:e.playAudio,onMicChange:d})]})})}};var A,b,V;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(V=(b=m.parameters)==null?void 0:b.docs)==null?void 0:V.source}}};var x,k,S;h.parameters={...h.parameters,docs:{...(x=h.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(S=(k=h.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var M,R,T;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(T=(R=f.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};const ne=["Overview","WithCover","WithControls"];export{m as Overview,f as WithControls,h as WithCover,ne as __namedExportsOrder,re as default};
//# sourceMappingURL=RemoteUser.stories-a3cd5ce6.js.map
