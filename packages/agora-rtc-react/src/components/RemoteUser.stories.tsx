import type { RemoteUserProps } from "./RemoteUser";
import type { StoryObj } from "@storybook/react";

import { faker } from "@faker-js/faker";
import { FakeRemoteVideoTrack, FakeRemoteAudioTrack, createFakeRtcClient } from "fake-agora-rtc";
import { useState } from "react";
import { AgoraRTCProvider } from "../hooks/context";
import { RemoteUser } from "./RemoteUser";

export default {
  title: "RemoteUser",
  component: RemoteUser,
};

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
  argTypes: {
    user: { table: { read: true } },
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
