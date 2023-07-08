import{j as e,F as w}from"./jsx-runtime-670450c2.js";import{T as f,A as u}from"./TrackBoundary-6e6b0a76.js";import{a as A}from"./index-b50b194b.js";import{r as d}from"./index-f1f749bf.js";import{F as S,A as B}from"./useRTCClient-8da5010b.js";import{R as g}from"./RemoteUser-bda93cbd.js";import"./_commonjsHelpers-042e6b4d.js";import"./v4-a8fe6692.js";import"./remote-video-track-5f739a1e.js";import"./remote-track-7856421c.js";import"./remote-audio-track-150b84d8.js";import"./styles-2f9d0643.js";import"./RemoteAudioTrack-ad16e331.js";import"./RemoteVideoTrack-a3202365.js";const I={title:"Tools/TrackBoundary",tags:["autodocs"],component:f,argTypes:{direction:{name:"Layout Direction",description:"[Demo Only] Horizontal or vertical layout",table:{defaultValue:{summary:"row"}},type:"string",options:["row","column"],control:{type:"select"}},show:{name:"Show",description:"[Demo Only] Show or hide the entire component",table:{defaultValue:{summary:"true"}},type:"boolean",control:{type:"boolean"}}},args:{direction:"row",show:!0},decorators:[n=>{const[r]=d.useState(()=>S.create(o=>{const a=o.subscribe.bind(o);return{subscribe:async(t,c)=>{const p=await a(t,c);return V(p,()=>A(`${c==="audio"?"AudioTrack":"VideoTrack"}.stop()`)(t.uid)),p}}}));return e(B,{client:r,children:n()})}]},i={parameters:{docs:{description:{story:"With TrackBoundary, Track Players will not trigger `track.stop()` on unmount. Tracks will be stopped if inactive or TrackBoundary unmounts."}}},render:function({direction:r,show:o}){const[a]=d.useState(()=>[{uid:u(),hasVideo:!0,hasAudio:!0},{uid:u(),hasVideo:!0,hasAudio:!0}]);return o?e(f,{children:e("div",{style:{display:"flex",gap:8,flexDirection:r},children:a.map(t=>e(g,{playAudio:!0,playVideo:!0,user:t},r+t.uid))})}):e(w,{})}},s={parameters:{docs:{description:{story:"Without TrackBoundary, Track Players will trigger `track.stop()` on unmount."}}},render:function({direction:r,show:o}){const[a]=d.useState(()=>[{uid:u(),hasVideo:!0,hasAudio:!0},{uid:u(),hasVideo:!0,hasAudio:!0}]);return o?e("div",{style:{display:"flex",gap:8,flexDirection:r},children:a.map(t=>e(g,{playAudio:!0,playVideo:!0,user:t},r+t.uid))}):e(w,{})}};function V(n,r){const o=n.stop;n.stop=function(){r(),o.call(this)}}var l,y,m;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(T=(k=s.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};const _=["LayoutSwitchWithTrackBoundary","LayoutSwitchWithoutTrackBoundary"];export{i as LayoutSwitchWithTrackBoundary,s as LayoutSwitchWithoutTrackBoundary,_ as __namedExportsOrder,I as default};
//# sourceMappingURL=TrackBoundary.stories-9d415aa7.js.map
