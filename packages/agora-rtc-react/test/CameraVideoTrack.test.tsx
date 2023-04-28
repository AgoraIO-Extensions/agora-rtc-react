import type { Mock } from "vitest";
import { describe, test, vi, expect } from "vitest";
import { render } from "@testing-library/react";
import { composeStories } from "@storybook/react";
import type { ICameraVideoTrack } from "agora-rtc-sdk-ng";
import * as stories from "../src/components/CameraVideoTrack.stories";
const { Enabled, EmptyTrack } = composeStories(stories);
import { CameraVideoTrack } from "../src/components";
import { useAwaited } from "../src/hooks";

vi.mock("../src/hooks", () => ({
  useAwaited: vi.fn(),
}));
const mockTrack: ICameraVideoTrack = {
  setDevice: vi.fn(),
} as unknown as ICameraVideoTrack;
const mockUseAwaited = useAwaited as Mock;

describe("LocalVideoTrack component", () => {
  test("renders without crashing", () => {
    mockUseAwaited.mockReturnValueOnce(mockTrack);
    const { container } = render(<CameraVideoTrack track={mockTrack} />);
    expect(container).toBeInTheDocument();
    vi.resetAllMocks();
  });

  test("sets device ID on audio track", async () => {
    mockUseAwaited.mockReturnValueOnce(mockTrack);
    render(<CameraVideoTrack deviceId={"123"} />);
    expect(mockTrack.setDevice).toHaveBeenCalledTimes(1);
    expect(mockTrack.setDevice).toHaveBeenCalledWith("123");
    vi.resetAllMocks();
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
