import CameraVideoTrackComponent from "./CameraVideoTrack";
import LocalAudioTrackComponent from "./LocalAudioTrack";
import LocalMicrophoneAndCameraUserComponent from "./LocalMicrophoneAndCameraUser";
import LocalUserComponent from "./LocalUser";
import LocalVideoTrackComponent from "./LocalVideoTrack";
import MicrophoneAudioTrackComponent from "./MicrophoneAudioTrack";
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
];

export { Components };
