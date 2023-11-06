import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import type { IMicrophoneAudioTrack } from "agora-rtc-react";
import { useAwaited } from "agora-rtc-react/src/hooks/tools";
import type { Mock } from "vitest";
import { describe, expect, test, vi } from "vitest";

import { MicrophoneAudioTrack } from "../src/components";
import * as stories from "../src/stories/MicrophoneAudioTrack.stories";
const { Enabled } = composeStories(stories);

vi.mock("agora-rtc-react/src/hooks/tools", () => ({
  useAwaited: vi.fn(),
  useIsomorphicLayoutEffect: vi.fn(),
}));
const mockTrack: IMicrophoneAudioTrack = {
  setDevice: vi.fn().mockReturnValue(Promise.resolve()),
} as unknown as IMicrophoneAudioTrack;
const mockUseAwaited = useAwaited as Mock;

describe("MicrophoneAudioTrack component", () => {
  test("renders without crashing", () => {
    mockUseAwaited.mockReturnValueOnce(mockTrack);
    const { container } = render(<MicrophoneAudioTrack />);
    expect(container).toBeInTheDocument();
    vi.clearAllMocks();
  });

  test("sets device ID on audio track", () => {
    mockUseAwaited.mockReturnValueOnce(mockTrack);
    const deviceId = "mockDeviceId";
    render(<MicrophoneAudioTrack deviceId={deviceId} />);
    expect(mockTrack.setDevice).toHaveBeenCalledTimes(1);
    expect(mockTrack.setDevice).toHaveBeenCalledWith(deviceId);
    vi.clearAllMocks();
  });
});

describe("MicrophoneAudioTrack component stories", () => {
  test("renders Enabled stories", async () => {
    const { getByText } = render(<Enabled />);
    expect(getByText("An Example Microphone Audio Track")).toBeInTheDocument();
  });
});
