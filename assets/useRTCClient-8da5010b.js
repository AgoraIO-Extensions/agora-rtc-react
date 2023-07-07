var h=Object.defineProperty;var f=(e,t,r)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var n=(e,t,r)=>(f(e,typeof t!="symbol"?t+"":t,r),r);import{f as m,h as v,S as p,A as g}from"./TrackBoundary-6e6b0a76.js";import{F as T}from"./remote-video-track-5f739a1e.js";import{F as k}from"./remote-audio-track-150b84d8.js";import{j as s,a as C,F as b}from"./jsx-runtime-670450c2.js";import{F as w}from"./styles-2f9d0643.js";import{r as d}from"./index-f1f749bf.js";var E="!#%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",A=87,U=20,a=[],R=()=>{for(let e=0;e<U;e++)a[e]=E.charAt(Math.random()*A);return a.join("")};function c(e){try{return e()}catch(t){console.error(t)}}var y=class{constructor(){this.push=this.addDisposer,this.disposers=new Map}addDisposer(e,t=this.genUID()){return this.flush(t),this.disposers.set(t,Array.isArray(e)?x(e):e),t}add(e,t=this.genUID()){const r=e();return r?this.addDisposer(r,t):t}addEventListener(e,t,r,i,o=this.genUID()){return e.addEventListener(t,r,i),this.addDisposer(()=>e.removeEventListener(t,r,i),o),o}setTimeout(e,t,r=this.genUID()){const i=window.setTimeout(()=>{this.remove(r),e()},t);return this.addDisposer(()=>window.clearTimeout(i),r)}setInterval(e,t,r=this.genUID()){const i=window.setInterval(e,t);return this.addDisposer(()=>window.clearInterval(i),r)}remove(e){const t=this.disposers.get(e);return this.disposers.delete(e),t}flush(e){const t=this.remove(e);t&&t()}flushAll(){this.disposers.forEach(c),this.disposers.clear()}genUID(){let e;do e=R();while(this.disposers.has(e));return e}};function x(e){return()=>e.forEach(c)}class u extends m{constructor(){super();n(this,"remoteUsers",[]);n(this,"_sideEffect",new y);v(this,"_disposable")}static create(r){const i=new u,o=typeof r=="function"?r(i):r;return Object.assign(i,o)}subscribe(r,i){if(i==="audio"){if(!r.audioTrack){const o=k.create();r.audioTrack=o,this._sideEffect.setInterval(()=>{o.setVolume(p({min:0,max:100}))},2e3,String(r.uid))}return Promise.resolve(r.audioTrack)}else{if(!r.videoTrack){const o=T.create();r.videoTrack=o}return Promise.resolve(r.videoTrack)}}async unsubscribe(r,i){(!i||i==="audio")&&r.audioTrack&&(r.audioTrack.stop(),r.audioTrack=void 0,this._sideEffect.flush(String(r.uid))),(!i||i==="video")&&r.videoTrack&&(r.videoTrack.stop(),r.videoTrack=void 0)}massUnsubscribe(r,i){r.forEach(o=>{this.unsubscribe(o,i)})}join(){return Promise.resolve(g())}leave(){return Promise.resolve()}}const F={width:"100%",height:"100%",background:"#1a1e21 center/cover no-repeat",filter:"blur(16px) brightness(0.4)"},I={position:"absolute",top:"50%",left:"50%",maxWidth:"50%",maxHeight:"50%",aspectRatio:"1",transform:"translate(-50%, -50%)",borderRadius:"50%",overflow:"hidden",objectFit:"cover"};function P({cover:e}){return s("div",{style:w,children:typeof e=="string"?C(b,{children:[s("div",{style:{...F,backgroundImage:`url(${e})`}}),s("img",{src:e,style:I})]}):e()})}P.__docgenInfo={description:"User Cover image with blur background",methods:[],displayName:"UserCover",props:{cover:{required:!0,tsType:{name:"union",raw:"string | (() => ReactNode)",elements:[{name:"string"},{name:"unknown"}]},description:"Cover image url or a custom render function."}}};const l=d.createContext(null);function S({client:e,children:t}){return s(l.Provider,{value:e,children:t})}function D(e){const t=d.useContext(l);return e||t}function B(e){const t=D(e);if(!t)throw new Error("Agora RTC client not found. Should be wrapped in <AgoraRTCProvider value={client} />");return t}S.__docgenInfo={description:"",methods:[],displayName:"AgoraRTCProvider",props:{client:{required:!0,tsType:{name:"IAgoraRTCClient"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};export{S as A,u as F,P as U,B as u};
//# sourceMappingURL=useRTCClient-8da5010b.js.map
