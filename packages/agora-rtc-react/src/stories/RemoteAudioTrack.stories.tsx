import type { Meta, StoryObj } from "@storybook/react";
import { FakeRemoteAudioTrack } from "fake-agora-rtc";

import type { RemoteAudioTrackProps } from "../components";
import { RemoteAudioTrack } from "../components";

const meta: Meta<RemoteAudioTrackProps> = {
  title: "Track/RemoteAudioTrack",
  component: RemoteAudioTrack,
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
      <RemoteAudioTrack {...args}>
        <p>An Example Remote Audio Track</p>
      </RemoteAudioTrack>
    );
  },
};

export default meta;

export const Enabled: StoryObj<RemoteAudioTrackProps> = {
  args: {
    track: FakeRemoteAudioTrack.create(),
    play: true,
  },
};

export const EmptyTrack: StoryObj<RemoteAudioTrackProps> = {
  args: {
    play: true,
  },
};
