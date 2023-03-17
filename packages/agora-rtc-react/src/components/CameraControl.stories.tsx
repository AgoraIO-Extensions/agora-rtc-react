import type { CameraControlProps } from "./CameraControl";
import type { StoryObj, Meta } from "@storybook/react";

import { CameraControl } from "./CameraControl";

const meta: Meta<CameraControlProps> = {
  title: "Prebuilt/CameraControl",
  component: CameraControl,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "light" },
  },
};

export default meta;

export const CameraOn: StoryObj<CameraControlProps> = {
  args: {
    cameraOn: true,
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
