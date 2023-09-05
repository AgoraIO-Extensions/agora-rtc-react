import type { Meta, StoryObj } from "@storybook/react";
import { FakeMicrophoneAudioTrack } from "agora-rtc-sdk-ng-fake";

import type { MicrophoneAudioTrackProps } from "../components";
import { MicrophoneAudioTrack } from "../components";

const meta: Meta<MicrophoneAudioTrackProps> = {
  title: "Track/MicrophoneAudioTrack",
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
