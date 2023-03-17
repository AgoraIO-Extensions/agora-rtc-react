import type { Meta, StoryObj } from "@storybook/react";
import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import type { RemoteUserProps } from "./RemoteUser";

import { randFirstName, randNumber, randUuid } from "@ngneat/falso";
import { useArgs } from "@storybook/preview-api";
import { createFakeRtcClient, FakeRemoteAudioTrack, FakeRemoteVideoTrack } from "fake-agora-rtc";
import { useCallback, useEffect, useState } from "react";
import { AgoraRTCProvider } from "../hooks/context";
import { interval } from "../utils";
import { CameraControl } from "./CameraControl";
import { MicControl } from "./MicControl";
import { RemoteUser } from "./RemoteUser";

const meta: Meta<RemoteUserProps> = {
  title: "Prebuilt/RemoteUser",
  component: RemoteUser,
  tags: ["autodocs"],
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

      const [client] = useState(() =>
        createFakeRtcClient({
          subscribe: async (user, mediaType): Promise<any> => {
            if (mediaType === "audio") {
              const audioTrack = FakeRemoteAudioTrack.create();
              user.audioTrack = audioTrack;
              return audioTrack;
            } else {
              const videoTrack = FakeRemoteVideoTrack.create();
              user.videoTrack = videoTrack;
              return videoTrack;
            }
          },
          unsubscribe: async () => void 0,
        }),
      );
      return <AgoraRTCProvider client={client}>{Story()}</AgoraRTCProvider>;
    },
  ],
};

export default meta;

function RenderRemoteUser(args: RemoteUserProps) {
  const [user] = useState<IAgoraRTCRemoteUser | undefined>(() => args.user && { ...args.user });
  const [, updateArgs] = useArgs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateArgs({ user }), []);
  return <RemoteUser {...args} user={user} />;
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
    cover: "http://placekitten.com/200/200",
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
    style: { borderRadius: 8 },
    cover: "http://placekitten.com/200/200",
  },
  render: function WithControls(args) {
    const [user] = useState<IAgoraRTCRemoteUser | undefined>(() => args.user && { ...args.user });
    const [userName] = useState(randFirstName());
    const [, updateArgs] = useArgs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => updateArgs({ user }), []);
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
            style={{ margin: "0 10px 0 auto" }}
            cameraOn={args.playVideo}
            onCameraChange={setVideo}
          />
          <MicControl audioTrack={user?.audioTrack} micOn={args.playAudio} onMicChange={setAudio} />
        </div>
      </RemoteUser>
    );
  },
};
