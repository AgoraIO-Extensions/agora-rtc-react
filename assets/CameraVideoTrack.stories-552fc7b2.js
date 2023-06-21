import{j as y}from"./jsx-runtime-670450c2.js";import{F as t}from"./TrackBoundary-a2d0821a.js";import{r as g}from"./index-f1f749bf.js";import{C as c}from"./CameraVideoTrack-49f6d3f0.js";import"./index.esm-ac4cb3bc.js";import"./_commonjsHelpers-042e6b4d.js";import"./LocalVideoTrack-a4d02d18.js";import"./styles-7e450fee.js";const j={title:"Track/CameraVideoTrack",component:c,tags:["autodocs"],parameters:{layout:"fullscreen"},argTypes:{track:{control:{type:null}}},render:function(o){const[T]=g.useState(()=>o.track?t.create():void 0);return y(c,{...o,track:T})}},r={args:{track:t.create(),play:!0}},a={args:{play:!0,children:y("p",{children:"An Empty Track"})}},e={args:{track:t.create(),play:!0,disabled:!0}};var s,n,p;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    track: FakeCameraVideoTrack.create(),
    play: true
  }
}`,...(p=(n=r.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};var m,d,i;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    play: true,
    children: <p>An Empty Track</p>
  }
}`,...(i=(d=a.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var l,u,k;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    track: FakeCameraVideoTrack.create(),
    play: true,
    disabled: true
  }
}`,...(k=(u=e.parameters)==null?void 0:u.docs)==null?void 0:k.source}}};const A=["Enabled","EmptyTrack","Disabled"];export{e as Disabled,a as EmptyTrack,r as Enabled,A as __namedExportsOrder,j as default};
//# sourceMappingURL=CameraVideoTrack.stories-552fc7b2.js.map
