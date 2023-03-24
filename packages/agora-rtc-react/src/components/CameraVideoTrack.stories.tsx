import type { CameraVideoTrackProps } from "./CameraVideoTrack";
import type { StoryObj, Meta } from "@storybook/react";

import { CameraVideoTrack } from "./CameraVideoTrack";
import { FakeCameraVideoTrack } from "fake-agora-rtc";
import { useState } from "react";

const meta: Meta<CameraVideoTrackProps> = {
  title: "Track/CameraVideoTrack",
  component: CameraVideoTrack,
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
  render: function RenderCameraVideoTrack(args) {
    const [track] = useState(() => (args.track ? FakeCameraVideoTrack.create() : undefined));
    return <CameraVideoTrack {...args} track={track} />;
  },
};

export default meta;

export const Enabled: StoryObj<CameraVideoTrackProps> = {
  args: {
    track: FakeCameraVideoTrack.create(),
    play: true,
  },
};

export const EmptyTrack: StoryObj<CameraVideoTrackProps> = {
  args: {
    play: true,
    children: <p>An Empty Track</p>,
  },
};

export const Disabled: StoryObj<CameraVideoTrackProps> = {
  args: {
    track: FakeCameraVideoTrack.create(),
    play: true,
    disabled: true,
  },
};
