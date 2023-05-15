import MultiChannel from "./advanced/multi-channel";
import SwitchLayout from "./advanced/switch-layout";
import Overview from "./basic/overview";
import UsePublish from "./hook/UsePublish";
import UseJoin from "./hook/useJoin";

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
