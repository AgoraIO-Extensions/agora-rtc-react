import{k as o}from"./quick-mechanical-keyboard-14391-c203a4f2.js";import{h as s}from"./TrackBoundary-09ed2e35.js";import{F as u}from"./remote-track-9cd6f7b1.js";class t extends u{constructor({audioURI:i=o,volume:a=100,...e}={}){super({...e,trackMediaType:"audio"}),this._volume=Math.max(0,Math.min(100,a)),this._audioURI=i,s(this,"_audioEl","_volume","_audioURI")}static create(i){return new t(i)}valueOf(){return"valueOf"}toString(){return"toString"}toJSON(){return"toJSON"}play(){this._audioEl||(this._audioEl=document.createElement("audio"),this._audioEl.loop=!0,document.body.appendChild(this._audioEl)),this._audioEl.src=this._audioURI,this._audioEl.volume=this._volume/100,this._audioEl&&(this.isPlaying=!0,this._audioEl.play().catch(console.log))}stop(){this.isPlaying&&this._audioEl&&(this.isPlaying=!1,this._audioEl.pause())}setVolume(i){i=Math.max(0,Math.min(100,i)),this._volume!==i&&(this._volume=i,this._audioEl&&(this._audioEl.volume=i/100))}getVolumeLevel(){return this._volume/100}async setPlaybackDevice(i){console.log("[FakeRemoteAudioTrack]: setPlaybackDevice",i)}}export{t as F};
//# sourceMappingURL=remote-audio-track-c9f9a53d.js.map
