import type { Meta, StoryObj } from "@storybook/react";

import type { CameraControlProps } from "../components";
import { CameraControl } from "../components";

const meta: Meta<CameraControlProps> = {
  title: "Controls/CameraControl",
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
