import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import type { ILocalAudioTrack } from "agora-rtc-sdk-ng";
import type { Mock } from "vitest";
import { describe, expect, test, vi } from "vitest";

import { LocalAudioTrack, useAutoPlayAudioTrack } from "../../src/components";
import { useAwaited } from "../../src/hooks/tools";
import * as stories from "../../src/stories/LocalAudioTrack.stories";
const { Enabled } = composeStories(stories);

vi.mock("../../src/hooks/tools", () => ({
  useAwaited: vi.fn(),
}));
vi.mock("../../src/components/TrackBoundary", () => ({
  useAutoPlayAudioTrack: vi.fn(),
}));
const mockTrack: ILocalAudioTrack = {
  setEnabled: vi.fn().mockReturnValue(Promise.resolve()),
  setMuted: vi.fn().mockReturnValue(Promise.resolve()),
  setVolume: vi.fn(),
} as unknown as ILocalAudioTrack;
const mockUseAwaited = useAwaited as Mock;
const mockUseAutoPlayAudioTrack = useAutoPlayAudioTrack as Mock;

describe("LocalAudioTrack component", () => {
  test("renders without crashing", () => {
    mockUseAwaited.mockReturnValueOnce(mockTrack);
    mockUseAutoPlayAudioTrack.mockReturnValueOnce(mockTrack);
    const { container } = render(<LocalAudioTrack />);
    expect(container).toBeInTheDocument();
    vi.clearAllMocks();
  });

  test("sets volume on audio track", () => {
    mockUseAwaited.mockReturnValueOnce(mockTrack);
    mockUseAutoPlayAudioTrack.mockReturnValueOnce(mockTrack);
    render(<LocalAudioTrack track={mockTrack} volume={0.5} />);
    expect(mockTrack.setVolume).toHaveBeenCalledTimes(1);
    expect(mockTrack.setVolume).toHaveBeenCalledWith(0.5);
    vi.clearAllMocks();
  });

  test("sets disabled on audio track", () => {
    mockUseAwaited.mockReturnValueOnce(mockTrack);
    mockUseAutoPlayAudioTrack.mockReturnValueOnce(mockTrack);
    render(<LocalAudioTrack disabled />);
    expect(mockTrack.setEnabled).toHaveBeenCalledTimes(1);
    expect(mockTrack.setEnabled).toHaveBeenCalledWith(false);
    vi.clearAllMocks();
  });

  test("sets muted on audio track", () => {
    mockUseAwaited.mockReturnValueOnce(mockTrack);
    mockUseAutoPlayAudioTrack.mockReturnValueOnce(mockTrack);
    render(<LocalAudioTrack muted />);
    expect(mockTrack.setMuted).toHaveBeenCalledTimes(1);
    expect(mockTrack.setMuted).toHaveBeenCalledWith(true);
    vi.clearAllMocks();
  });
});

describe("LocalAudioTrack component stories", () => {
  test("renders Enabled stories", () => {
    const { getByText } = render(<Enabled />);
    expect(getByText(/An Example Local Audio Track/i)).toBeInTheDocument();
  });
});
