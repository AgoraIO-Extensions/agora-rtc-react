import type { Meta, StoryObj } from "@storybook/react";
import { FakeLocalVideoTrack } from "agora-rtc-sdk-ng-fake";
import { useState } from "react";

import type { LocalVideoTrackProps } from "../components";
import { LocalVideoTrack } from "../components";

const meta: Meta<LocalVideoTrackProps> = {
  title: "Track/LocalVideoTrack",
  component: LocalVideoTrack,
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
  render: function RenderLocalVideoTrack(args) {
    const [track] = useState(() => (args.track ? FakeLocalVideoTrack.create() : undefined));
    return <LocalVideoTrack {...args} track={track} />;
  },
};

export default meta;

export const Enabled: StoryObj<LocalVideoTrackProps> = {
  args: {
    track: FakeLocalVideoTrack.create(),
    play: true,
  },
};

export const EmptyTrack: StoryObj<LocalVideoTrackProps> = {
  args: {
    play: true,
    children: <p>An Empty Local Video Track</p>,
  },
};
