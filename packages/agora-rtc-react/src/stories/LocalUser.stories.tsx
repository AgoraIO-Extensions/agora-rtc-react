import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import type { LocalMicrophoneAndCameraUserProps } from "agora-rtc-react-ui/src/components/LocalMicrophoneAndCameraUser";
import {
  FakeCameraVideoTrack,
  FakeMicrophoneAudioTrack,
  FakeRTCClient,
} from "agora-rtc-sdk-ng-fake";
import { useEffect, useMemo, useState } from "react";

import { LocalUser } from "../components";
import { AgoraRTCProvider } from "../hooks";

const meta: Meta<LocalMicrophoneAndCameraUserProps> = {
  title: "User/LocalUser",
  component: LocalUser,
  parameters: {
    backgrounds: { default: "light" },
  },
};

export default meta;

interface OverviewProps {
  micOn: boolean;
  cameraOn: boolean;
}

type OverviewArgs = OverviewProps & Omit<LocalMicrophoneAndCameraUserProps, keyof OverviewProps>;

export const Overview: StoryObj<OverviewArgs> = {
  args: {
    micOn: false,
    cameraOn: false,
    playVideo: false,
    playAudio: false,
    cover: "https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg",
    style: {
      width: 288,
      height: 216,
    },
  },
  render: function RenderLocalUser({ micOn, cameraOn, ...args }: OverviewArgs) {
    const [client] = useState(() =>
      FakeRTCClient.create({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        publish: async () => {
          action("IAgoraRTCClient.publish()")();
        },
      }),
    );

    const audioTrack = useMemo(() => {
      return micOn ? FakeMicrophoneAudioTrack.create() : null;
    }, [micOn]);

    const videoTrack = useMemo(() => {
      return cameraOn ? FakeCameraVideoTrack.create() : null;
    }, [cameraOn]);

    useEffect(() => {
      if (client && audioTrack) {
        client.publish(audioTrack);
      }
    }, [client, audioTrack]);

    useEffect(() => {
      if (client && videoTrack) {
        client.publish(videoTrack);
      }
    }, [client, videoTrack]);

    return (
      <AgoraRTCProvider client={client}>
        <LocalUser
          audioTrack={audioTrack}
          cameraOn={cameraOn}
          micOn={micOn}
          videoTrack={videoTrack}
          {...args}
        />
      </AgoraRTCProvider>
    );
  },
};
