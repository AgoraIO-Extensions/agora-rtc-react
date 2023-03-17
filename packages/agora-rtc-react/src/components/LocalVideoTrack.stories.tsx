import type { LocalVideoTrackProps } from "./LocalVideoTrack";
import type { StoryObj, Meta } from "@storybook/react";

import { LocalVideoTrack } from "./LocalVideoTrack";
import { FakeLocalVideoTrack } from "fake-agora-rtc";
import { useState } from "react";

const meta: Meta<LocalVideoTrackProps> = {
  title: "Core/LocalVideoTrack",
  component: LocalVideoTrack,
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
