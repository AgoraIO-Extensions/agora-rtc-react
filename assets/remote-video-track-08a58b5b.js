import{i as s}from"./styles-050b788a.js";import{h as d}from"./TrackBoundary-09ed2e35.js";import{F as l}from"./remote-track-9cd6f7b1.js";class o extends l{constructor({videoURI:i=s,...t}={}){super({...t,trackMediaType:"video"}),this._videoURI=i,d(this,"_config","_videoEl","_videoURI")}static create(i){return new o(i)}play(i,t){this._config=t;const e=typeof i=="string"?document.getElementById(i):i;this._videoEl||(this._videoEl=document.createElement("video"),this._videoEl.style.width="100%",this._videoEl.style.height="100%",this._videoEl.style.objectFit="cover",this._videoEl.loop=!0,this._videoEl.muted=!0),this._videoEl.src=this._videoURI,this._videoEl.style.opacity="1",e&&e.appendChild(this._videoEl),this._videoEl&&(this.isPlaying=!0,this._videoEl.play().catch(console.log))}stop(){this.isPlaying&&this._videoEl&&(this.isPlaying=!1,this._videoEl.style.opacity="0",this._videoEl.pause())}}export{o as F};
//# sourceMappingURL=remote-video-track-08a58b5b.js.map