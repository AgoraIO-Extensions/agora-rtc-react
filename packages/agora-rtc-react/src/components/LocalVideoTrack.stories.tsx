import type { LocalVideoTrackProps } from "./LocalVideoTrack";
import type { StoryObj, Meta } from "@storybook/react";
import type { FC } from "react";

import { LocalVideoTrack } from "./LocalVideoTrack";
import { FakeLocalVideoTrack } from "fake-agora-rtc";

const meta: Meta<LocalVideoTrackProps> = {
  title: "Core/LocalVideoTrack",
  component: LocalVideoTrack as FC<LocalVideoTrackProps>,
  parameters: {
    layout: "fullscreen",
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
  },
};
