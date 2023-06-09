import CameraVideoTrackComponent from "./CameraVideoTrack";
import LocalAudioTrackComponent from "./LocalAudioTrack";
import LocalMicrophoneAndCameraUserComponent from "./LocalMicrophoneAndCameraUser";
import LocalUserComponent from "./LocalUser";
import LocalVideoTrackComponent from "./LocalVideoTrack";
import MicrophoneAudioTrackComponent from "./MicrophoneAudioTrack";
import RemoteAudioTrackComponent from "./RemoteAudioTrack";
import RemoteUserComponent from "./RemoteUser";
import RemoteVideoPlayerComponent from "./RemoteVideoPlayer";
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
  {
    label: "LocalMicrophoneAndCameraUser",
    component: LocalMicrophoneAndCameraUserComponent,
  },
  {
    label: "CameraVideoTrack",
    component: CameraVideoTrackComponent,
  },
  {
    label: "MicrophoneAudioTrack",
    component: MicrophoneAudioTrackComponent,
  },
  {
    label: "RemoteUser",
    component: RemoteUserComponent,
  },
  {
    label: "RemoteVideoPlayer",
    component: RemoteVideoPlayerComponent,
  },
];

export { Components };
