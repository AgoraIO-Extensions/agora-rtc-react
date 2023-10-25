import{j as i}from"./jsx-runtime-ffb262ed.js";import{r as u}from"./index-76fb7be0.js";import{F as d}from"./remote-video-track-cf639b9f.js";import{R as a}from"./RemoteVideoTrack-607ac9be.js";import"./_commonjsHelpers-de833af9.js";import"./styles-87cce120.js";import"./TrackBoundary-97d9068a.js";import"./remote-track-81128c7c.js";const j={title:"Track/RemoteVideoTrack",component:a,parameters:{layout:"fullscreen"},argTypes:{track:{control:{type:null}}},render:function(t){const[l]=u.useState(()=>t.track?d.create():void 0);return i.jsx(a,{...t,track:l})}},e={args:{track:d.create(),play:!0}},r={args:{play:!0,children:i.jsx("p",{children:"An Empty Remote Video Track"})}};var o,c,s;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
//# sourceMappingURL=RemoteVideoTrack.stories-16ac0139.js.map
