import { randNumber } from "@ngneat/falso";
import type { Meta, StoryObj } from "@storybook/react";
import { FakeLocalAudioTrack, FakeRemoteAudioTrack } from "agora-rtc-sdk-ng-fake";
import { useEffect } from "react";

import type { MicControlProps } from "../components";
import { MicControl } from "../components";

const meta: Meta<MicControlProps> = {
  title: "Controls/MicControl",
  component: MicControl,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "light" },
  },
  decorators: [
    (Story, context) => {
      const audioTrack = context.args.audioTrack;
      useEffect(() => {
        if (audioTrack) {
          const ticket = setInterval(() => {
            audioTrack.setVolume(randNumber({ min: 0, max: 100 }));
          }, 2000);
          return () => clearInterval(ticket);
        }
      }, [audioTrack]);
      return Story();
    },
  ],
};

export default meta;

export const MicOn: StoryObj<MicControlProps> = {
  args: {
    audioTrack: FakeLocalAudioTrack.create(),
    micOn: true,
  },
};

export const MicOff: StoryObj<MicControlProps> = {
  args: {
    audioTrack: FakeLocalAudioTrack.create(),
  },
};

export const RemoteMicOn: StoryObj<MicControlProps> = {
  args: {
    audioTrack: FakeRemoteAudioTrack.create(),
    micOn: true,
    disabled: true,
  },
};
