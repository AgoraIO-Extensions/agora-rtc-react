import MultiChannel from "./multi-channel";
import SwitchLayout from "./switchLayout";
import UseJoin from "./useJoin";
import UseJoinAfterAction from "./useJoinAfterAction";
import UsePublish from "./usePublish";
const Pages = [
  {
    label: "switch-layout",
    component: SwitchLayout,
  },
  {
    label: "multi-channel",
    component: MultiChannel,
  },
  {
    label: "useJoin",
    component: UseJoin,
  },
  {
    label: "useJoinAfterAction",
    component: UseJoinAfterAction,
  },
  {
    label: "usePublish",
    component: UsePublish,
  },
];

export { Pages };
