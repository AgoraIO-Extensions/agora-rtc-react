import type { Meta, StoryObj } from "@storybook/react";
import type { LocalUserProps } from "./LocalUser";

import { action } from "@storybook/addon-actions";
import { createFakeRtcClient } from "fake-agora-rtc";
import { useState } from "react";
import { LocalUser } from "./LocalUser";
import { AgoraRTCProvider } from "../hooks";

const meta: Meta<LocalUserProps> = {
  title: "Prebuilt/LocalUser",
  component: LocalUser,
  tags: ["autodocs"],
  argTypes: {
    client: {
      control: {
        type: null,
      },
    },
  },
  parameters: {
    backgrounds: { default: "light" },
  },
  decorators: [
    Story => {
      const [client] = useState(() =>
        createFakeRtcClient({
          publish: async () => {
            action("IAgoraRTCClient.publish()")();
          },
        }),
      );
      return <AgoraRTCProvider client={client}>{Story()}</AgoraRTCProvider>;
    },
  ],
};

export default meta;

export const Overview: StoryObj<LocalUserProps> = {
  args: {
    micOn: false,
    cameraOn: false,
  },
  render: function RenderLocalUser(args: LocalUserProps) {
    return <LocalUser {...args} />;
  },
};
