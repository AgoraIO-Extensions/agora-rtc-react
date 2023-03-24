import type { RemoteAudioTrackProps } from "./RemoteAudioTrack";
import type { StoryObj, Meta } from "@storybook/react";

import { RemoteAudioTrack } from "./RemoteAudioTrack";
import { FakeRemoteAudioTrack } from "fake-agora-rtc";

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
