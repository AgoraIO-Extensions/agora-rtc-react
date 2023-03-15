import type { LocalAudioTrackProps } from "./LocalAudioTrack";
import type { StoryObj, Meta } from "@storybook/react";
import type { FC } from "react";

import { LocalAudioTrack } from "./LocalAudioTrack";
import { FakeLocalAudioTrack } from "fake-agora-rtc";

const meta: Meta<LocalAudioTrackProps> = {
  title: "Core/LocalAudioTrack",
  component: LocalAudioTrack as FC<LocalAudioTrackProps>,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Enabled: StoryObj<LocalAudioTrackProps> = {
  args: {
    track: FakeLocalAudioTrack.create(),
    play: true,
  },
};

export const EmptyTrack: StoryObj<LocalAudioTrackProps> = {
  args: {
    play: true,
  },
};
