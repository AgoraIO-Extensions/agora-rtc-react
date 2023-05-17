import MultiChannel from "./advanced/multi-channel";
import SwitchLayout from "./advanced/switch-layout";
import Overview from "./basic/overview";
import UseJoin from "./hook/useJoin";
import UsePublish from "./hook/usePublish";

const Pages = [
  {
    label: "switch-layout",
    component: SwitchLayout,
  },
  {
    label: "overview",
    component: Overview,
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
    label: "usePublish",
    component: UsePublish,
  },
];

export { Pages };
