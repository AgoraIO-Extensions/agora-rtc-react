import type { CameraControlProps } from "./CameraControl";
import type { StoryObj, Meta } from "@storybook/react";

import { CameraControl } from "./CameraControl";

const meta: Meta<CameraControlProps> = {
  title: "Prebuilt/CameraControl",
  component: CameraControl,
  parameters: {
    backgrounds: { default: "light" },
    docs: {
      description: {
        component: "Applied to the title.",
        story: "Applied to all stories in this file.",
      },
    },
  },
};

export default meta;

export const CameraOn: StoryObj<CameraControlProps> = {
  args: {
    cameraOn: true,
  },
  parameters: {
    docs: {
      description: {
        story: "I have a custom description.",
      },
    },
  },
};

export const CameraOff: StoryObj<CameraControlProps> = {
  args: {},
};

export const RemoteCameraOn: StoryObj<CameraControlProps> = {
  args: {
    cameraOn: true,
    disabled: true,
  },
};
