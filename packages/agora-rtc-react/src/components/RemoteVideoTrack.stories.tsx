import type { RemoteVideoTrackProps } from "./RemoteVideoTrack";
import type { StoryObj, Meta } from "@storybook/react";

import { RemoteVideoTrack } from "./RemoteVideoTrack";
import { FakeRemoteVideoTrack } from "fake-agora-rtc";
import { useState } from "react";

const meta: Meta<RemoteVideoTrackProps> = {
  title: "Core/RemoteVideoTrack",
  component: RemoteVideoTrack,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    track: {
      control: {
        type: null,
      },
    },
  },
  render: function RenderRemoteVideoTrack(args) {
    const [track] = useState(() => (args.track ? FakeRemoteVideoTrack.create() : undefined));
    return <RemoteVideoTrack {...args} track={track} />;
  },
};

export default meta;

export const Enabled: StoryObj<RemoteVideoTrackProps> = {
  args: {
    track: FakeRemoteVideoTrack.create(),
    play: true,
  },
};

export const EmptyTrack: StoryObj<RemoteVideoTrackProps> = {
  args: {
    play: true,
    children: <p>An Empty Remote Video Track</p>,
  },
};
