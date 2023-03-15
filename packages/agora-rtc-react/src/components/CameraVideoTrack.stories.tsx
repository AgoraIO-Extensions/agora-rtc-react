import type { CameraVideoTrackProps } from "./CameraVideoTrack";
import type { StoryObj, Meta } from "@storybook/react";
import type { FC } from "react";

import { CameraVideoTrack } from "./CameraVideoTrack";
import { FakeCameraVideoTrack } from "fake-agora-rtc";

const meta: Meta<CameraVideoTrackProps> = {
  title: "Core/CameraVideoTrack",
  component: CameraVideoTrack as FC<CameraVideoTrackProps>,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Enabled: StoryObj<CameraVideoTrackProps> = {
  args: {
    track: FakeCameraVideoTrack.create(),
    enabled: true,
    play: true,
  },
};

export const EmptyTrack: StoryObj<CameraVideoTrackProps> = {
  args: {
    play: true,
  },
};

export const Disabled: StoryObj<CameraVideoTrackProps> = {
  args: {
    track: FakeCameraVideoTrack.create(),
    play: true,
  },
};
