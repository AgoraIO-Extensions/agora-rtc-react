import type { MicControlProps } from "./MicControl";
import type { StoryObj, Meta } from "@storybook/react";

import { faker } from "@faker-js/faker";
import { createFakeRtcClient, dispatchRTCEvent } from "fake-agora-rtc";
import { useEffect, useState } from "react";
import { AgoraRTCProvider } from "../hooks/context";
import { MicControl } from "./MicControl";
import { interval } from "../utils";

const meta: Meta<MicControlProps> = {
  title: "Prebuilt/MicControl",
  component: MicControl,
  parameters: {
    backgrounds: { default: "light" },
  },
  decorators: [
    (Story, context) => {
      const uid = context.args.uid || "123";
      const [client] = useState(createFakeRtcClient);
      useEffect(() => {
        return interval(() => {
          dispatchRTCEvent(client, "volume-indicator", [
            { uid, level: faker.datatype.number({ min: 0, max: 100 }) },
          ]);
        }, 2000);
      }, [client, uid]);
      return (
        <AgoraRTCProvider client={client}>
          <Story />
        </AgoraRTCProvider>
      );
    },
  ],
};

export default meta;

export const MicOn: StoryObj<MicControlProps> = {
  args: {
    uid: "123",
    micOn: true,
  },
};

export const MicOff: StoryObj<MicControlProps> = {
  args: {
    uid: "123",
  },
};

export const RemoteMicOn: StoryObj<MicControlProps> = {
  args: {
    uid: "123",
    micOn: true,
    disabled: true,
  },
};
