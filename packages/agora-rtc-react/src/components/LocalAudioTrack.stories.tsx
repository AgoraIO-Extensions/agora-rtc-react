import type { LocalAudioTrackProps } from "./LocalAudioTrack";
import type { StoryObj, Meta } from "@storybook/react";

import { LocalAudioTrack } from "./LocalAudioTrack";
import { FakeLocalAudioTrack } from "fake-agora-rtc";

const meta: Meta<LocalAudioTrackProps> = {
  title: "Core/LocalAudioTrack",
  component: LocalAudioTrack,
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
      <LocalAudioTrack {...args}>
        <p>An Example Local Audio Track</p>
      </LocalAudioTrack>
    );
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
