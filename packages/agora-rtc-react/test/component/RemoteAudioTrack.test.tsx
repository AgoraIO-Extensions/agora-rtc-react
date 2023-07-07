import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import type { IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import type { Mock } from "vitest";
import { describe, expect, test, vi } from "vitest";

import { RemoteAudioTrack, useAutoPlayAudioTrack } from "../../src/components";
import * as stories from "../../src/stories/RemoteAudioTrack.stories";
const { Enabled, EmptyTrack } = composeStories(stories);

vi.mock("../../src/components/TrackBoundary", () => ({
  useAutoPlayAudioTrack: vi.fn(),
}));
const mockTrack: IRemoteAudioTrack = {
  setPlaybackDevice: vi.fn().mockReturnValue(Promise.resolve()),
  setVolume: vi.fn(),
} as unknown as IRemoteAudioTrack;
const mockUseAutoPlayAudioTrack = useAutoPlayAudioTrack as Mock;

describe("RemoteAudioTrack component", () => {
  test("renders without crashing", () => {
    mockUseAutoPlayAudioTrack.mockReturnValueOnce(mockTrack);
    const { container } = render(<RemoteAudioTrack />);
    expect(container).toBeInTheDocument();
    vi.clearAllMocks();
  });

  test("sets volume on audio track", () => {
    mockUseAutoPlayAudioTrack.mockReturnValueOnce(mockTrack);
    render(<RemoteAudioTrack track={mockTrack} volume={0.5} />);
    expect(mockTrack.setVolume).toHaveBeenCalledTimes(1);
    expect(mockTrack.setVolume).toHaveBeenCalledWith(0.5);
    vi.clearAllMocks();
  });

  test("sets playbackDevice on audio but no track", () => {
    mockUseAutoPlayAudioTrack.mockReturnValueOnce(mockTrack);
    render(<RemoteAudioTrack playbackDeviceId={"test"} />);
    expect(mockTrack.setPlaybackDevice).toHaveBeenCalledTimes(0);
    vi.clearAllMocks();
  });

  test("sets playbackDevice on audio track", () => {
    mockUseAutoPlayAudioTrack.mockReturnValueOnce(mockTrack);
    render(<RemoteAudioTrack playbackDeviceId={"test"} track={mockTrack} />);
    expect(mockTrack.setPlaybackDevice).toHaveBeenCalledTimes(1);
    expect(mockTrack.setPlaybackDevice).toHaveBeenCalledWith("test");
    vi.clearAllMocks();
  });
});

describe("RemoteAudioTrack component stories", () => {
  test("renders Enabled stories", () => {
    const { getByText } = render(<Enabled />);
    expect(getByText(/An Example Remote Audio Track/i)).toBeInTheDocument();
  });

  test("renders EmptyTrack stories", () => {
    const { getByText } = render(<EmptyTrack />);
    expect(getByText(/An Example Remote Audio Track/i)).toBeInTheDocument();
  });
});
