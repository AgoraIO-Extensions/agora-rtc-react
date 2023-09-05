import type { Meta, StoryObj } from "@storybook/react";
import { FakeLocalAudioTrack } from "agora-rtc-sdk-ng-fake";

import type { LocalAudioTrackProps } from "../components";
import { LocalAudioTrack } from "../components";

const meta: Meta<LocalAudioTrackProps> = {
  title: "Track/LocalAudioTrack",
  component: LocalAudioTrack,
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
