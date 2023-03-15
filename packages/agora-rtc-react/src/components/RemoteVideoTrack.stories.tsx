import type { RemoteVideoTrackProps } from "./RemoteVideoTrack";
import type { StoryObj, Meta } from "@storybook/react";
import type { FC } from "react";

import { RemoteVideoTrack } from "./RemoteVideoTrack";
import { FakeRemoteVideoTrack } from "fake-agora-rtc";

const meta: Meta<RemoteVideoTrackProps> = {
  title: "Core/RemoteVideoTrack",
  component: RemoteVideoTrack as FC<RemoteVideoTrackProps>,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Enabled: StoryObj<RemoteVideoTrackProps> = {
  args: {
    track: FakeRemoteVideoTrack.create(),
    play: true,
  },
};

export const EmptyTrack: StoryObj<RemoteVideoTrackProps> = {
  args: {
    play: true,
  },
};
