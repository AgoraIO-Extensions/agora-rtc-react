import{j as a}from"./jsx-runtime-94f6e698.js";import{r as s}from"./index-8db94870.js";import{a as i}from"./TrackBoundary-b755f9d3.js";function u({track:e,play:n=!1,playbackDeviceId:r,volume:o,children:t}){return i(e,n),s.useEffect(()=>{e&&r!=null&&e.setPlaybackDevice(r).catch(console.warn)},[e,r]),s.useEffect(()=>{e&&o!=null&&e.setVolume(o)},[e,o]),t?a.jsx(a.Fragment,{children:t}):null}u.__docgenInfo={description:`This component plays the audio track of a remote user with the playback device you specify.
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
\`\`\``,methods:[],displayName:"RemoteAudioTrack",props:{play:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"boolean"},description:"`true`: Play the track.`false`: Stop playing the track."},track:{required:!1,tsType:{name:"union",raw:"T | null | undefined",elements:[{name:"IRemoteAudioTrack"},{name:"null"},{name:"undefined"}]},description:"The remote audio track to be played."},playbackDeviceId:{required:!1,tsType:{name:"string"},description:"The ID of the playback device, such as a speaker. The device ID can be obtained using [`IAgoraRTC.getPlaybackDevices`](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#getplaybackdevices). This property is only supported in the desktop version of Chrome browser. Modifying the value of this property in other browsers throws a `NOT_SUPPORTED` error."},volume:{required:!1,tsType:{name:"number"},description:"The volume. The value ranges from 0 (mute) to 100 (the original volume)."},children:{required:!1,tsType:{name:"ReactNode"},description:"The React nodes to be rendered."}}};export{u as R};
//# sourceMappingURL=RemoteAudioTrack-5ba36913.js.map
