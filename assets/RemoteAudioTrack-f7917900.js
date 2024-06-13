import{j as a}from"./jsx-runtime-1a9d9a93.js";import{r as s}from"./index-8b3efc3f.js";import{u as i}from"./TrackBoundary-32089e08.js";function u({track:e,play:n=!1,playbackDeviceId:o,volume:r,children:t}){return i(e,n),s.useEffect(()=>{e&&o!=null&&e.setPlaybackDevice(o).catch(console.warn)},[e,o]),s.useEffect(()=>{e&&r!=null&&e.setVolume(r)},[e,r]),t?a.jsx(a.Fragment,{children:t}):null}u.__docgenInfo={description:`This component plays the audio track of a remote user with the playback device you specify.
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
\`\`\``,methods:[],displayName:"RemoteAudioTrack",props:{track:{required:!1,tsType:{name:"union",raw:"T | null | undefined",elements:[{name:"IRemoteAudioTrack"},{name:"null"},{name:"undefined"}]},description:"The remote audio track to be played."},play:{required:!1,tsType:{name:"boolean"},description:"`true`: Play the track.`false`: Stop playing the track.",defaultValue:{value:"false",computed:!1}},playbackDeviceId:{required:!1,tsType:{name:"string"},description:"The ID of the playback device, such as a speaker. The device ID can be obtained using [`IAgoraRTC.getPlaybackDevices`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#getplaybackdevices). This property is only supported in the desktop version of Chrome browser. Modifying the value of this property in other browsers throws a `NOT_SUPPORTED` error."},volume:{required:!1,tsType:{name:"number"},description:"The volume. The value ranges from 0 (mute) to 100 (the original volume)."},children:{required:!1,tsType:{name:"ReactNode"},description:"The React nodes to be rendered."}}};export{u as R};
