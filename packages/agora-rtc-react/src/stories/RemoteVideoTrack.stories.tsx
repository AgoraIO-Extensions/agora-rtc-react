import type { Meta, StoryObj } from "@storybook/react";
import { FakeRemoteVideoTrack } from "agora-rtc-sdk-ng-fake";
import { useState } from "react";

import type { RemoteVideoTrackProps } from "../components";
import { RemoteVideoTrack } from "../components";

const meta: Meta<RemoteVideoTrackProps> = {
  title: "Track/RemoteVideoTrack",
  component: RemoteVideoTrack,
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
