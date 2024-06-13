import{j as r}from"./jsx-runtime-1a9d9a93.js";import{T as w,A as u}from"./TrackBoundary-32089e08.js";import{a as g}from"./chunk-OPEUWD42-91022b50.js";import{r as d}from"./index-8b3efc3f.js";import{F as x,A}from"./useRTCClient-3ab73db6.js";import{R as f}from"./RemoteUser-28e0cd50.js";import"./_commonjsHelpers-de833af9.js";import"./v4-4a60fe23.js";import"./remote-audio-track-a2569d31.js";import"./quick-mechanical-keyboard-14391-c203a4f2.js";import"./remote-track-889709df.js";import"./remote-video-track-72764928.js";import"./styles-6070efb3.js";import"./RemoteAudioTrack-f7917900.js";import"./RemoteVideoTrack-3a7e1cc4.js";const I={title:"Tools/TrackBoundary",component:w,argTypes:{direction:{name:"Layout Direction",description:"[Demo Only] Horizontal or vertical layout",table:{defaultValue:{summary:"row"}},type:"string",options:["row","column"],control:{type:"select"}},show:{name:"Show",description:"[Demo Only] Show or hide the entire component",table:{defaultValue:{summary:"true"}},type:"boolean",control:{type:"boolean"}}},args:{direction:"row",show:!0},decorators:[n=>{const[o]=d.useState(()=>x.create(t=>{const a=t.subscribe.bind(t);return{subscribe:async(e,c)=>{const p=await a(e,c);return S(p,()=>g(`${c==="audio"?"AudioTrack":"VideoTrack"}.stop()`)(e.uid)),p}}}));return r.jsx(A,{client:o,children:n()})}]},i={parameters:{docs:{description:{story:"With TrackBoundary, Track Players will not trigger `track.stop()` on unmount. Tracks will be stopped if inactive or TrackBoundary unmounts."}}},render:function({direction:o,show:t}){const[a]=d.useState(()=>[{uid:u(),hasVideo:!0,hasAudio:!0},{uid:u(),hasVideo:!0,hasAudio:!0}]);return t?r.jsx(w,{children:r.jsx("div",{style:{display:"flex",gap:8,flexDirection:o},children:a.map(e=>r.jsx(f,{playAudio:!0,playVideo:!0,user:e},o+e.uid))})}):r.jsx(r.Fragment,{})}},s={parameters:{docs:{description:{story:"Without TrackBoundary, Track Players will trigger `track.stop()` on unmount."}}},render:function({direction:o,show:t}){const[a]=d.useState(()=>[{uid:u(),hasVideo:!0,hasAudio:!0},{uid:u(),hasVideo:!0,hasAudio:!0}]);return t?r.jsx("div",{style:{display:"flex",gap:8,flexDirection:o},children:a.map(e=>r.jsx(f,{playAudio:!0,playVideo:!0,user:e},o+e.uid))}):r.jsx(r.Fragment,{})}};function S(n,o){const t=n.stop;n.stop=function(){o(),t.call(this)}}var l,m,y;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "With TrackBoundary, Track Players will not trigger \`track.stop()\` on unmount. Tracks will be stopped if inactive or TrackBoundary unmounts."
      }
    }
  },
  render: function LayoutSwitchWithTrackBoundary({
    direction,
    show
  }) {
    const [users] = useState<IAgoraRTCRemoteUser[]>(() => [{
      uid: randUuid(),
      hasVideo: true,
      hasAudio: true
    }, {
      uid: randUuid(),
      hasVideo: true,
      hasAudio: true
    }]);
    return show ? <TrackBoundary>
        <div style={{
        display: "flex",
        gap: 8,
        flexDirection: direction
      }}>
          {users.map(user => <RemoteUser key={direction + user.uid} playAudio playVideo user={user} />)}
        </div>
      </TrackBoundary> : <></>;
  }
}`,...(y=(m=i.parameters)==null?void 0:m.docs)==null?void 0:y.source}}};var h,k,T;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Without TrackBoundary, Track Players will trigger \`track.stop()\` on unmount."
      }
    }
  },
  render: function LayoutSwitchWithoutTrackBoundary({
    direction,
    show
  }) {
    const [users] = useState<IAgoraRTCRemoteUser[]>(() => [{
      uid: randUuid(),
      hasVideo: true,
      hasAudio: true
    }, {
      uid: randUuid(),
      hasVideo: true,
      hasAudio: true
    }]);
    return show ? <div style={{
      display: "flex",
      gap: 8,
      flexDirection: direction
    }}>
        {users.map(user => <RemoteUser key={direction + user.uid} playAudio playVideo user={user} />)}
      </div> : <></>;
  }
}`,...(T=(k=s.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};const _=["LayoutSwitchWithTrackBoundary","LayoutSwitchWithoutTrackBoundary"];export{i as LayoutSwitchWithTrackBoundary,s as LayoutSwitchWithoutTrackBoundary,_ as __namedExportsOrder,I as default};
