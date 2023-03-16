import type { MicControlProps } from "./MicControl";
import type { StoryObj, Meta } from "@storybook/react";

import { FakeLocalAudioTrack, FakeRemoteAudioTrack } from "fake-agora-rtc";
import { faker } from "@faker-js/faker";
import { useEffect } from "react";
import { MicControl } from "./MicControl";
import { interval } from "../utils";

const meta: Meta<MicControlProps> = {
  title: "Prebuilt/MicControl",
  component: MicControl,
  parameters: {
    backgrounds: { default: "light" },
  },
  decorators: [
    (Story, context) => {
      const audioTrack = context.args.audioTrack;
      useEffect(() => {
        if (audioTrack) {
          return interval(() => {
            audioTrack.setVolume(faker.datatype.number({ min: 0, max: 100 }));
          }, 2000);
        }
      }, [audioTrack]);
      return <Story />;
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
