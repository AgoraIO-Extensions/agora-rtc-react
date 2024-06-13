import{j as l}from"./jsx-runtime-1a9d9a93.js";import{r as u}from"./index-8b3efc3f.js";import{L as t,F as i}from"./LocalVideoTrack-4ae8f21a.js";import"./_commonjsHelpers-de833af9.js";import"./styles-6070efb3.js";import"./TrackBoundary-32089e08.js";import"./local-track-014e8716.js";const g={title:"Track/LocalVideoTrack",component:t,parameters:{layout:"fullscreen"},argTypes:{track:{control:{type:null}}},render:function(e){const[d]=u.useState(()=>e.track?i.create():void 0);return l.jsx(t,{...e,track:d})}},r={args:{track:i.create(),play:!0}},a={args:{play:!0,children:l.jsx("p",{children:"An Empty Local Video Track"})}};var o,c,s;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    track: FakeLocalVideoTrack.create(),
    play: true
  }
}`,...(s=(c=r.parameters)==null?void 0:c.docs)==null?void 0:s.source}}};var n,p,m;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    play: true,
    children: <p>An Empty Local Video Track</p>
  }
}`,...(m=(p=a.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const j=["Enabled","EmptyTrack"];export{a as EmptyTrack,r as Enabled,j as __namedExportsOrder,g as default};
