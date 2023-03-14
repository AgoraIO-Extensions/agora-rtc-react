import type { RemoteUserProps } from "./RemoteUser";
import { RemoteUser } from "./RemoteUser";
import type { StoryObj } from "@storybook/react";

export default {
  title: "RemoteUser",
  component: RemoteUser,
};

export const Overview: StoryObj<RemoteUserProps> = {
  args: {},
};
