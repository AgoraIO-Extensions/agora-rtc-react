import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import type { ICameraVideoTrack } from "agora-rtc-sdk-ng";
import type { Mock } from "vitest";
import { describe, expect, test, vi } from "vitest";

import { CameraVideoTrack } from "../src/components";
import * as stories from "../src/components/CameraVideoTrack.stories";
const { Enabled, EmptyTrack } = composeStories(stories);
import { useAwaited } from "../src/hooks";

vi.mock("../src/hooks", () => ({
  useAwaited: vi.fn(),
}));
const mockTrack: ICameraVideoTrack = {
  setDevice: vi.fn().mockReturnValue(Promise.resolve()),
} as unknown as ICameraVideoTrack;
const mockUseAwaited = useAwaited as Mock;

describe("LocalVideoTrack component", () => {
  test("renders without crashing", () => {
    mockUseAwaited.mockReturnValueOnce(mockTrack);
    const { container } = render(<CameraVideoTrack track={mockTrack} />);
    expect(container).toBeInTheDocument();
    vi.clearAllMocks();
  });

  test("sets device ID on audio track", async () => {
    mockUseAwaited.mockReturnValueOnce(mockTrack);
    render(<CameraVideoTrack deviceId={"123"} />);
    expect(mockTrack.setDevice).toHaveBeenCalledTimes(1);
    expect(mockTrack.setDevice).toHaveBeenCalledWith("123");
    vi.clearAllMocks();
  });
});

describe("LocalVideoTrack component stories", () => {
  test("renders Enabled stories", () => {
    const { container } = render(<Enabled />);
    expect(container).toBeInTheDocument();
  });

  test("renders EmptyTrack stories", () => {
    const { getByText } = render(<EmptyTrack />);
    expect(getByText(/An Empty Track/i)).toBeInTheDocument();
  });
});
