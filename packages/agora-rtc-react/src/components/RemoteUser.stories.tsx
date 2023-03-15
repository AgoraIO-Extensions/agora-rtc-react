import type { Meta, StoryObj } from "@storybook/react";
import type { FC } from "react";
import { useCallback } from "react";
import type { RemoteUserProps } from "./RemoteUser";

import { faker } from "@faker-js/faker";
import {
  createFakeRtcClient,
  dispatchRTCEvent,
  FakeRemoteAudioTrack,
  FakeRemoteVideoTrack,
} from "fake-agora-rtc";
import { useArgs } from "@storybook/preview-api";
import { useEffect, useState } from "react";
import { AgoraRTCProvider } from "../hooks/context";
import { interval } from "../utils";
import { CameraControl } from "./CameraControl";
import { MicControl } from "./MicControl";
import { RemoteUser } from "./RemoteUser";

const meta: Meta<RemoteUserProps> = {
  title: "Prebuilt/RemoteUser",
  component: RemoteUser as FC<RemoteUserProps>,
  argTypes: {
    user: { table: { disable: true } },
  },
  parameters: {
    backgrounds: { default: "light" },
  },
  decorators: [
    (Story, context) => {
      const uid = context.args.user?.uid || "123";
      const [client] = useState(() =>
        createFakeRtcClient({
          enableAudioVolumeIndicator: () => void 0,
          subscribe: async (user, mediaType): Promise<any> =>
            mediaType === "audio"
              ? (user.audioTrack = FakeRemoteAudioTrack.create())
              : (user.videoTrack = FakeRemoteVideoTrack.create()),
          unsubscribe: async () => void 0,
        }),
      );
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

export const Overview: StoryObj<RemoteUserProps> = {
  args: {
    user: {
      uid: faker.datatype.uuid(),
      hasVideo: true,
      hasAudio: true,
    },
    playVideo: true,
    playAudio: false,
  },
};

export const WithControls: StoryObj<RemoteUserProps> = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  args: {
    user: {
      uid: faker.datatype.uuid(),
      hasVideo: true,
      hasAudio: true,
    },
    playVideo: true,
    playAudio: false,
    style: { borderRadius: 8 },
  },
  render(args) {
    /* eslint-disable react-hooks/rules-of-hooks */
    const [userName] = useState(faker.name.firstName());
    const [, updateArgs] = useArgs();
    const setVideo = useCallback(
      (playVideo: boolean): void => {
        updateArgs({ playVideo });
      },
      [updateArgs],
    );
    const setAudio = useCallback(
      (playAudio: boolean): void => {
        updateArgs({ playAudio });
      },
      [updateArgs],
    );
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <RemoteUser {...args}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            boxSizing: "border-box",
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            padding: "4px 4px 4px 8px",
            color: "#fff",
          }}
        >
          <span style={{ userSelect: "none" }}>{userName}</span>
          <CameraControl
            style={{ margin: "0 10px 0 auto" }}
            cameraOn={args.playVideo}
            onCameraChange={setVideo}
          />
          <MicControl uid={args.user?.uid} micOn={args.playAudio} onMicChange={setAudio} />
        </div>
      </RemoteUser>
    );
  },
};
