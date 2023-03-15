import type { StoryObj, Meta } from "@storybook/react";
import type { FC } from "react";
import type { RemoteUserProps } from "./RemoteUser";

import { faker } from "@faker-js/faker";
import { FakeRemoteVideoTrack, FakeRemoteAudioTrack, createFakeRtcClient } from "fake-agora-rtc";
import { useState } from "react";
import { AgoraRTCProvider } from "../hooks/context";
import { RemoteUser } from "./RemoteUser";

const meta: Meta<RemoteUserProps> = {
  title: "RemoteUser",
  component: RemoteUser as FC<RemoteUserProps>,
  argTypes: {
    user: { table: { disable: true } },
  },
  render: ({ ref, ...args }) => {
    return <RemoteUser {...args} />;
  },
  decorators: [
    Story => {
      const [client] = useState(() =>
        createFakeRtcClient({
          subscribe: async (user, mediaType): Promise<any> =>
            mediaType === "audio"
              ? (user.audioTrack = FakeRemoteAudioTrack.create())
              : (user.videoTrack = FakeRemoteVideoTrack.create()),
          unsubscribe: async () => void 0,
        }),
      );
      return (
        <AgoraRTCProvider client={client}>
          <Story />
        </AgoraRTCProvider>
      );
    },
  ],
};

export default meta;

export const Overview: StoryObj<RemoteUserProps> = {
  args: {
    user: {
      uid: faker.datatype.uuid(),
      hasVideo: true,
      hasAudio: true,
    },
    videoOn: true,
    audioOn: false,
  },
};
