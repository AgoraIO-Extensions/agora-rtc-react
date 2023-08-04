import UseAutoPlayAudioTrack from "./useAutoPlayAudioTrack";
import UseAutoPlayVideoTrack from "./useAutoPlayVideoTrack";
import UseConnectionState from "./useConnectionState";
import UseCurrentUID from "./useCurrentUID";
import UseIsConnected from "./useIsConnected";
import UseJoin from "./useJoin";
import UseLocalScreenTrack from "./useLocalScreenTrack";
import UseNetworkQuality from "./useNetworkQuality";
import UsePublish from "./usePublish";
import UseRemoteUsers from "./useRemoteUsers";
const Hooks = [
  {
    label: "useJoin",
    component: UseJoin,
  },
  {
    label: "usePublish",
    component: UsePublish,
  },
  {
    label: "useRemoteUsers",
    component: UseRemoteUsers,
  },
  {
    label: "useConnectionState",
    component: UseConnectionState,
  },
  {
    label: "useIsConnected",
    component: UseIsConnected,
  },
  {
    label: "useCurrentUID",
    component: UseCurrentUID,
  },
  {
    label: "useAutoPlayAudioTrack",
    component: UseAutoPlayAudioTrack,
  },
  {
    label: "useAutoPlayVideoTrack",
    component: UseAutoPlayVideoTrack,
  },
  {
    label: "useNetworkQuality",
    component: UseNetworkQuality,
  },
  {
    label: "useLocalScreenTrack",
    component: UseLocalScreenTrack,
  },
];

export { Hooks };
