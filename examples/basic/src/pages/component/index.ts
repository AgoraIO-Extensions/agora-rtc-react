import LocalAudioTrackComponent from "./LocalAudioTrack";
import LocalUserComponent from "./LocalUser";
import LocalVideoTrackComponent from "./LocalVideoTrack";
import RemoteAudioTrackComponent from "./RemoteAudioTrack";
import RemoteVideoTrackComponent from "./RemoteVideoTrack";

const Components = [
  {
    label: "LocalAudioTrack",
    component: LocalAudioTrackComponent,
  },
  {
    label: "RemoteAudioTrack",
    component: RemoteAudioTrackComponent,
  },
  {
    label: "LocalVideoTrack",
    component: LocalVideoTrackComponent,
  },
  {
    label: "RemoteVideoTrack",
    component: RemoteVideoTrackComponent,
  },
  {
    label: "LocalUser",
    component: LocalUserComponent,
  },
];

export { Components };
