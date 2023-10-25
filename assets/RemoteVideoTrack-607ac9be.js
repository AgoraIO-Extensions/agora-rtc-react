import{j as i}from"./jsx-runtime-ffb262ed.js";import{r as c}from"./index-76fb7be0.js";import{u as m,V as d}from"./styles-87cce120.js";import{a as p}from"./TrackBoundary-97d9068a.js";function u({track:e,play:o,style:t,...r}){const s=m(d,t),[a,n]=c.useState(null);return p(e,o,a),i.jsx("div",{...r,ref:n,style:s})}u.__docgenInfo={description:`This component plays the video track of a remote user and does not support specifying the playback device.
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
\`\`\``,methods:[],displayName:"RemoteVideoTrack",props:{track:{required:!1,tsType:{name:"union",raw:"T | null | undefined",elements:[{name:"IRemoteVideoTrack"},{name:"null"},{name:"undefined"}]},description:"The remote video track object."},play:{required:!1,tsType:{name:"boolean"},description:"`true`: Play the track.`false`: Stop playing the track."}},composes:["HTMLProps"]};export{u as R};
//# sourceMappingURL=RemoteVideoTrack-607ac9be.js.map
