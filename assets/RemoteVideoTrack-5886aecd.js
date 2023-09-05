import{j as i}from"./jsx-runtime-94f6e698.js";import{r as c}from"./index-8db94870.js";import{u as m,V as d}from"./styles-050b788a.js";import{a as p}from"./TrackBoundary-09ed2e35.js";function u({track:e,play:o,style:t,...r}){const s=m(d,t),[a,n]=c.useState(null);return p(e,o,a),i.jsx("div",{...r,ref:n,style:s})}u.__docgenInfo={description:`This component plays the video track of a remote user and does not support specifying the playback device.
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
//# sourceMappingURL=RemoteVideoTrack-5886aecd.js.map
