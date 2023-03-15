import type { RemoteAudioTrackProps } from "./RemoteAudioTrack";
import type { StoryObj, Meta } from "@storybook/react";
import type { FC } from "react";

import { RemoteAudioTrack } from "./RemoteAudioTrack";
import { FakeRemoteAudioTrack } from "fake-agora-rtc";

const meta: Meta<RemoteAudioTrackProps> = {
  title: "Core/RemoteAudioTrack",
  component: RemoteAudioTrack as FC<RemoteAudioTrackProps>,
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
