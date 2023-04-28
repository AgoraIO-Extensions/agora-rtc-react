import type { Mock } from "vitest";
import { describe, test, vi, expect } from "vitest";
import { render } from "@testing-library/react";
import { composeStories } from "@storybook/react";
import type { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import * as stories from "../src/components/MicrophoneAudioTrack.stories";
const { Enabled } = composeStories(stories);
import { MicrophoneAudioTrack } from "../src/components";
import { useAwaited } from "../src/hooks";

vi.mock("../src/hooks", () => ({
  useAwaited: vi.fn(),
}));
const mockTrack: IMicrophoneAudioTrack = {
  setDevice: vi.fn(),
  setEnabled: vi.fn(),
} as unknown as IMicrophoneAudioTrack;
const mockUseAwaited = useAwaited as Mock;

describe("MicrophoneAudioTrack component", () => {
  test("renders without crashing", () => {
    mockUseAwaited.mockReturnValueOnce(mockTrack);
    const { container } = render(<MicrophoneAudioTrack />);
    expect(container).toBeInTheDocument();
    vi.resetAllMocks();
  });

  test("sets device ID on audio track", () => {
    mockUseAwaited.mockReturnValueOnce(mockTrack);
    const deviceId = "mockDeviceId";
    render(<MicrophoneAudioTrack deviceId={deviceId} />);
    expect(mockTrack.setDevice).toHaveBeenCalledTimes(1);
    expect(mockTrack.setDevice).toHaveBeenCalledWith(deviceId);
    vi.resetAllMocks();
  });
});

describe("MicrophoneAudioTrack component stories", () => {
  test("renders EmptyTrack stories", async () => {
    const { getByText } = render(<Enabled />);
    expect(getByText("An Example Microphone Audio Track")).toBeInTheDocument();
  });
});
