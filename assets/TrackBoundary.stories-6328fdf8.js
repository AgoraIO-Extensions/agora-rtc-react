import{j as r}from"./jsx-runtime-94f6e698.js";import{T as w,A as u}from"./TrackBoundary-09ed2e35.js";import{a as g}from"./chunk-OPEUWD42-a3b45fd8.js";import{r as d}from"./index-8db94870.js";import{F as x,A}from"./useRTCClient-c750e90a.js";import{R as f}from"./RemoteUser-d0fb35fa.js";import"./_commonjsHelpers-042e6b4d.js";import"./remote-audio-track-c9f9a53d.js";import"./quick-mechanical-keyboard-14391-c203a4f2.js";import"./remote-track-9cd6f7b1.js";import"./remote-video-track-08a58b5b.js";import"./styles-050b788a.js";import"./RemoteAudioTrack-3cc2a4e3.js";import"./RemoteVideoTrack-5886aecd.js";const O={title:"Tools/TrackBoundary",component:w,argTypes:{direction:{name:"Layout Direction",description:"[Demo Only] Horizontal or vertical layout",table:{defaultValue:{summary:"row"}},type:"string",options:["row","column"],control:{type:"select"}},show:{name:"Show",description:"[Demo Only] Show or hide the entire component",table:{defaultValue:{summary:"true"}},type:"boolean",control:{type:"boolean"}}},args:{direction:"row",show:!0},decorators:[n=>{const[o]=d.useState(()=>x.create(t=>{const a=t.subscribe.bind(t);return{subscribe:async(e,c)=>{const p=await a(e,c);return S(p,()=>g(`${c==="audio"?"AudioTrack":"VideoTrack"}.stop()`)(e.uid)),p}}}));return r.jsx(A,{client:o,children:n()})}]},i={parameters:{docs:{description:{story:"With TrackBoundary, Track Players will not trigger `track.stop()` on unmount. Tracks will be stopped if inactive or TrackBoundary unmounts."}}},render:function({direction:o,show:t}){const[a]=d.useState(()=>[{uid:u(),hasVideo:!0,hasAudio:!0},{uid:u(),hasVideo:!0,hasAudio:!0}]);return t?r.jsx(w,{children:r.jsx("div",{style:{display:"flex",gap:8,flexDirection:o},children:a.map(e=>r.jsx(f,{playAudio:!0,playVideo:!0,user:e},o+e.uid))})}):r.jsx(r.Fragment,{})}},s={parameters:{docs:{description:{story:"Without TrackBoundary, Track Players will trigger `track.stop()` on unmount."}}},render:function({direction:o,show:t}){const[a]=d.useState(()=>[{uid:u(),hasVideo:!0,hasAudio:!0},{uid:u(),hasVideo:!0,hasAudio:!0}]);return t?r.jsx("div",{style:{display:"flex",gap:8,flexDirection:o},children:a.map(e=>r.jsx(f,{playAudio:!0,playVideo:!0,user:e},o+e.uid))}):r.jsx(r.Fragment,{})}};function S(n,o){const t=n.stop;n.stop=function(){o(),t.call(this)}}var l,y,m;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(m=(y=i.parameters)==null?void 0:y.docs)==null?void 0:m.source}}};var h,k,T;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(T=(k=s.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};const I=["LayoutSwitchWithTrackBoundary","LayoutSwitchWithoutTrackBoundary"];export{i as LayoutSwitchWithTrackBoundary,s as LayoutSwitchWithoutTrackBoundary,I as __namedExportsOrder,O as default};
//# sourceMappingURL=TrackBoundary.stories-6328fdf8.js.map
