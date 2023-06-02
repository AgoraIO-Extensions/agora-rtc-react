import UseConnectionState from "./useConnectionState";
import UseCurrentUID from "./useCurrentUID";
import UseIsConnected from "./useIsConnected";
import UseJoin from "./useJoin";
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
];

export { Hooks };
