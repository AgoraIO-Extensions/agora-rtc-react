import type { RemoteAudioTrackProps } from "./RemoteAudioTrack";
import type { StoryObj, Meta } from "@storybook/react";

import { RemoteAudioTrack } from "./RemoteAudioTrack";
import { FakeRemoteAudioTrack } from "fake-agora-rtc";

const meta: Meta<RemoteAudioTrackProps> = {
  title: "Core/RemoteAudioTrack",
  component: RemoteAudioTrack,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
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
