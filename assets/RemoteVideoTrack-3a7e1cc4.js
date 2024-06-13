import{j as d}from"./jsx-runtime-1a9d9a93.js";import{r as c}from"./index-8b3efc3f.js";import{u as m,V as l}from"./styles-6070efb3.js";import{a as p}from"./TrackBoundary-32089e08.js";function u({track:e,play:o,style:r,videoPlayerConfig:t,...a}){const n=m(l,r),[s,i]=c.useState(null);return p(e,o,t,s),d.jsx("div",{...a,ref:i,style:n})}u.__docgenInfo={description:`This component plays the video track of a remote user and does not support specifying the playback device.
@example
\`\`\`jsx
import { RemoteAudioTrack, useJoin, useRemoteAudioTracks, useRemoteUsers } from "agora-rtc-react";

function App() {
  const remoteUsers = useRemoteUsers();
  const audioTracks = useRemoteAudioTracks(remoteUsers);

  return (
    <>
      {audioTracks.map(track => (
        <RemoteAudioTrack key={track.getUserId()} play track={track} />
      ))}
    </>
  );
}
\`\`\``,methods:[],displayName:"RemoteVideoTrack",props:{track:{required:!1,tsType:{name:"union",raw:"T | null | undefined",elements:[{name:"IRemoteVideoTrack"},{name:"null"},{name:"undefined"}]},description:"The remote video track object."},play:{required:!1,tsType:{name:"boolean"},description:"`true`: Play the track.`false`: Stop playing the track."},videoPlayerConfig:{required:!1,tsType:{name:"VideoPlayerConfig"},description:"Playback configurations for a video track including setting the mirror and display mode. The SDK enables mirror mode for the local video track by default. See [`VideoPlayerConfig`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/videoplayerconfig.html) for details."}},composes:["HTMLProps"]};export{u as R};
