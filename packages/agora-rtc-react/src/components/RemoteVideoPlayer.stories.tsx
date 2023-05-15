import type { Meta, StoryObj } from "@storybook/react";
import { FakeRTCClient, FakeRemoteVideoTrack } from "fake-agora-rtc";
import { useState } from "react";

import { AgoraRTCProvider } from "../hooks/context";

import type { RemoteVideoPlayerProps } from "./RemoteVideoPlayer";
import { RemoteVideoPlayer } from "./RemoteVideoPlayer";

const meta: Meta<RemoteVideoPlayerProps> = {
  title: "Video/RemoteVideoPlayer",
  component: RemoteVideoPlayer,
  tags: ["autodocs"],
  argTypes: {
    track: {
      control: {
        type: null,
      },
    },
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
      const [client] = useState(() => FakeRTCClient.create());
      return <AgoraRTCProvider client={client}>{Story()}</AgoraRTCProvider>;
    },
  ],
};

export default meta;

function RenderRemoteVideoPlayer(args: RemoteVideoPlayerProps) {
  const { track } = args;
  const [_track] = useState(() => (track ? FakeRemoteVideoTrack.create() : undefined));

  return <RemoteVideoPlayer {...args} track={_track} />;
}

export const Overview: StoryObj<RemoteVideoPlayerProps> = {
  parameters: {
    docs: {
      description: {
        story: "Show cover image if `playVideo` is `false`.",
      },
    },
  },
  args: {
    playVideo: true,
    track: FakeRemoteVideoTrack.create(),
    style: {
      width: 288,
      height: 216,
    },
  },
  render: RenderRemoteVideoPlayer,
};

export const WithCover: StoryObj<RemoteVideoPlayerProps> = {
  parameters: {
    docs: {
      description: {
        story: "Show cover image if `playVideo` is `false`.",
      },
    },
  },
  args: {
    playVideo: false,
    track: FakeRemoteVideoTrack.create(),
    cover: "http://placekitten.com/200/200",
    style: {
      width: 288,
      height: 216,
    },
  },
  render: RenderRemoteVideoPlayer,
};
