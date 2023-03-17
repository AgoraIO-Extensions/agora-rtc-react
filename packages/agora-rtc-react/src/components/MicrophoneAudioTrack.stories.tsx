import type { MicrophoneAudioTrackProps } from "./MicrophoneAudioTrack";
import type { StoryObj, Meta } from "@storybook/react";

import { MicrophoneAudioTrack } from "./MicrophoneAudioTrack";
import { FakeMicrophoneAudioTrack } from "fake-agora-rtc";

const meta: Meta<MicrophoneAudioTrackProps> = {
  title: "Core/MicrophoneAudioTrack",
  component: MicrophoneAudioTrack,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Enabled: StoryObj<MicrophoneAudioTrackProps> = {
  args: {
    track: FakeMicrophoneAudioTrack.create(),
    play: true,
    enabled: true,
  },
};

export const EmptyTrack: StoryObj<MicrophoneAudioTrackProps> = {
  args: {
    play: true,
  },
};

export const Disabled: StoryObj<MicrophoneAudioTrackProps> = {
  args: {
    track: FakeMicrophoneAudioTrack.create(),
    play: true,
  },
};
