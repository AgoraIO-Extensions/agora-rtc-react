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
  argTypes: {
    track: {
      control: {
        type: null,
      },
    },
  },
  render(args) {
    return (
      <MicrophoneAudioTrack {...args}>
        <p>An Example Microphone Audio Track</p>
      </MicrophoneAudioTrack>
    );
  },
};

export default meta;

export const Enabled: StoryObj<MicrophoneAudioTrackProps> = {
  args: {
    track: FakeMicrophoneAudioTrack.create(),
    play: true,
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
    disabled: true,
  },
};
