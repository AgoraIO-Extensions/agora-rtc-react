import { randFirstName, randNumber, randUuid } from "@ngneat/falso";
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { CameraControl, MicControl } from "agora-rtc-react-ui";
import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { FakeRTCClient } from "agora-rtc-sdk-ng-fake";
import { useCallback, useEffect, useState } from "react";

import type { RemoteUserProps } from "../components";
import { RemoteUser } from "../components";
import { AgoraRTCProvider } from "../hooks/useRTCClient";
import { interval } from "../misc/utils";

const meta: Meta<RemoteUserProps> = {
  title: "User/RemoteUser",
  component: RemoteUser,
  argTypes: {
    user: {
      control: {
        type: null,
      },
    },
  },
  parameters: {
    backgrounds: { default: "light" },
  },
  decorators: [
    (Story, context) => {
      const audioTrack = context.args.user?.audioTrack;

      useEffect(() => {
        if (audioTrack) {
          return interval(() => {
            audioTrack.setVolume(randNumber({ min: 0, max: 100 }));
          }, 2000);
        }
      }, [audioTrack]);

      const [client] = useState(() => FakeRTCClient.create());
      return <AgoraRTCProvider client={client}>{Story()}</AgoraRTCProvider>;
    },
  ],
};

export default meta;

function RenderRemoteUser(args: RemoteUserProps) {
  const { user } = args;
  const [_user] = useState<IAgoraRTCRemoteUser | undefined>(() => user && { ...user });
  return <RemoteUser {...args} user={_user} />;
}

export const Overview: StoryObj<RemoteUserProps> = {
  args: {
    playVideo: true,
    playAudio: false,
    user: {
      uid: randUuid(),
      hasVideo: true,
      hasAudio: true,
    },
    style: {
      width: 288,
      height: 216,
    },
  },
  render: RenderRemoteUser,
};

export const WithCover: StoryObj<RemoteUserProps> = {
  parameters: {
    docs: {
      description: {
        story: "Show cover image if `playVideo` is `false`.",
      },
    },
  },
  args: {
    user: {
      uid: randUuid(),
      hasVideo: true,
      hasAudio: true,
    },
    playVideo: false,
    playAudio: false,
    cover: "https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg",
    style: {
      width: 288,
      height: 216,
    },
  },
  render: RenderRemoteUser,
};

export const WithControls: StoryObj<RemoteUserProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Add buttons to control the video and audio track. Navigate to the story on the right sidebar and paly with it.",
      },
    },
  },
  args: {
    user: {
      uid: randUuid(),
      hasVideo: true,
      hasAudio: true,
    },
    playVideo: true,
    playAudio: false,
    style: {
      borderRadius: 8,
      width: 288,
      height: 216,
    },
    cover: "https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg",
  },
  render: function WithControls(args) {
    const [user] = useState<IAgoraRTCRemoteUser | undefined>(() => args.user && { ...args.user });
    const [userName] = useState(randFirstName());
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

    return (
      <RemoteUser {...args} user={user}>
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
            cameraOn={args.playVideo}
            onCameraChange={setVideo}
            style={{ margin: "0 10px 0 auto" }}
          />
          <MicControl audioTrack={user?.audioTrack} micOn={args.playAudio} onMicChange={setAudio} />
        </div>
      </RemoteUser>
    );
  },
};
