import{c as l,h,S as m,A as v}from"./TrackBoundary-09ed2e35.js";import{F as f}from"./remote-audio-track-c9f9a53d.js";import{F as p}from"./remote-video-track-08a58b5b.js";import{j as o}from"./jsx-runtime-94f6e698.js";import{F as g}from"./styles-050b788a.js";import{r as a}from"./index-8db94870.js";var T="!#%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",k=87,C=20,n=[],b=()=>{for(let r=0;r<C;r++)n[r]=T.charAt(Math.random()*k);return n.join("")};function c(r){try{return r()}catch(e){console.error(e)}}var w=class{constructor(){this.push=this.addDisposer,this.disposers=new Map}addDisposer(r,e=this.genUID()){return this.flush(e),this.disposers.set(e,Array.isArray(r)?x(r):r),e}add(r,e=this.genUID()){const t=r();return t?this.addDisposer(t,e):e}addEventListener(r,e,t,i,s=this.genUID()){return r.addEventListener(e,t,i),this.addDisposer(()=>r.removeEventListener(e,t,i),s),s}setTimeout(r,e,t=this.genUID()){const i=window.setTimeout(()=>{this.remove(t),r()},e);return this.addDisposer(()=>window.clearTimeout(i),t)}setInterval(r,e,t=this.genUID()){const i=window.setInterval(r,e);return this.addDisposer(()=>window.clearInterval(i),t)}remove(r){const e=this.disposers.get(r);return this.disposers.delete(r),e}flush(r){const e=this.remove(r);e&&e()}flushAll(){this.disposers.forEach(c),this.disposers.clear()}genUID(){let r;do r=b();while(this.disposers.has(r));return r}};function x(r){return()=>r.forEach(c)}class d extends l{constructor(){super(),this.remoteUsers=[],this._sideEffect=new w,h(this,"_disposable")}static create(e){const t=new d,i=typeof e=="function"?e(t):e;return Object.assign(t,i)}subscribe(e,t){if(t==="audio"){if(!e.audioTrack){const i=f.create();e.audioTrack=i,this._sideEffect.setInterval(()=>{i.setVolume(m({min:0,max:100}))},2e3,String(e.uid))}return Promise.resolve(e.audioTrack)}else{if(!e.videoTrack){const i=p.create();e.videoTrack=i}return Promise.resolve(e.videoTrack)}}async unsubscribe(e,t){(!t||t==="audio")&&e.audioTrack&&(e.audioTrack.stop(),e.audioTrack=void 0,this._sideEffect.flush(String(e.uid))),(!t||t==="video")&&e.videoTrack&&(e.videoTrack.stop(),e.videoTrack=void 0)}massUnsubscribe(e,t){e.forEach(i=>{this.unsubscribe(i,t)})}join(){return Promise.resolve(v())}leave(){return Promise.resolve()}}const E={width:"100%",height:"100%",background:"#1a1e21 center/cover no-repeat",filter:"blur(16px) brightness(0.4)"},A={position:"absolute",top:"50%",left:"50%",maxWidth:"50%",maxHeight:"50%",aspectRatio:"1",transform:"translate(-50%, -50%)",borderRadius:"50%",overflow:"hidden",objectFit:"cover"};function R({cover:r}){return o.jsx("div",{style:g,children:typeof r=="string"?o.jsxs(o.Fragment,{children:[o.jsx("div",{style:{...E,backgroundImage:`url(${r})`}}),o.jsx("img",{src:r,style:A})]}):r()})}R.__docgenInfo={description:"User Cover image with blur background",methods:[],displayName:"UserCover",props:{cover:{required:!0,tsType:{name:"union",raw:"string | (() => ReactNode)",elements:[{name:"string"},{name:"unknown"}]},description:"Cover image url or a custom render function."}}};const u=a.createContext(null);function U({client:r,children:e}){return o.jsx(u.Provider,{value:r,children:e})}function y(r){const e=a.useContext(u);return r||e}function _(r){const e=y(r);if(!e)throw new Error("Agora RTC client not found. Should be wrapped in <AgoraRTCProvider value={client} />");return e}U.__docgenInfo={description:"",methods:[],displayName:"AgoraRTCProvider",props:{client:{required:!0,tsType:{name:"IAgoraRTCClient"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};export{U as A,d as F,R as U,_ as u};
//# sourceMappingURL=useRTCClient-c750e90a.js.map