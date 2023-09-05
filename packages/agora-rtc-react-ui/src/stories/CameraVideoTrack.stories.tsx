import type { Meta, StoryObj } from "@storybook/react";
import { FakeCameraVideoTrack } from "agora-rtc-sdk-ng-fake";
import { useState } from "react";

import type { CameraVideoTrackProps } from "../components";
import { CameraVideoTrack } from "../components";

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
