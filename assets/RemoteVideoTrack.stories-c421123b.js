import{j as i}from"./jsx-runtime-94f6e698.js";import{r as u}from"./index-8db94870.js";import{F as d}from"./remote-video-track-08a58b5b.js";import{R as a}from"./RemoteVideoTrack-5886aecd.js";import"./_commonjsHelpers-042e6b4d.js";import"./styles-050b788a.js";import"./TrackBoundary-09ed2e35.js";import"./remote-track-9cd6f7b1.js";const j={title:"Track/RemoteVideoTrack",component:a,parameters:{layout:"fullscreen"},argTypes:{track:{control:{type:null}}},render:function(t){const[l]=u.useState(()=>t.track?d.create():void 0);return i.jsx(a,{...t,track:l})}},e={args:{track:d.create(),play:!0}},r={args:{play:!0,children:i.jsx("p",{children:"An Empty Remote Video Track"})}};var o,c,s;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    track: FakeRemoteVideoTrack.create(),
    play: true
  }
}`,...(s=(c=e.parameters)==null?void 0:c.docs)==null?void 0:s.source}}};var m,n,p;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    play: true,
    children: <p>An Empty Remote Video Track</p>
  }
}`,...(p=(n=r.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};const h=["Enabled","EmptyTrack"];export{r as EmptyTrack,e as Enabled,h as __namedExportsOrder,j as default};
//# sourceMappingURL=RemoteVideoTrack.stories-c421123b.js.map
