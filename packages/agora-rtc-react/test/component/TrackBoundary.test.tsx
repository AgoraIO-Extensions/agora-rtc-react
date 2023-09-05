import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import type { ITrack } from "agora-rtc-sdk-ng";
import { FakeRTCClient } from "agora-rtc-sdk-ng-fake";
import type { Mock } from "vitest";
import { describe, expect, test, vi } from "vitest";

import { TrackBoundary } from "../../src/components";
import { AgoraRTCProvider, useRemoteUserTrack } from "../../src/hooks";
import * as stories from "../../src/stories/TrackBoundary.stories";
const { LayoutSwitchWithTrackBoundary, LayoutSwitchWithoutTrackBoundary } = composeStories(stories);

vi.mock("../../src/hooks", () => ({
  useRemoteUserTrack: vi.fn(),
  AgoraRTCProvider: vi.fn(),
}));
const mockTrack: ITrack = {
  stop: vi.fn().mockReturnValue(Promise.resolve()),
} as unknown as ITrack;

const mockUseRemoteUserTrack = useRemoteUserTrack as Mock;

describe("TrackBoundary component", () => {
  test("renders without crashing", () => {
    const { container } = render(
      <AgoraRTCProvider client={FakeRTCClient.create()}>
        <TrackBoundary />
      </AgoraRTCProvider>,
    );
    expect(container).toBeInTheDocument();
  });
});

describe("TrackBoundary component stories", () => {
  test("renders LayoutSwitchWithTrackBoundary stories", () => {
    mockUseRemoteUserTrack.mockReturnValueOnce(mockTrack);

    const { container, unmount } = render(<LayoutSwitchWithTrackBoundary />);
    expect(container).toBeInTheDocument();
    unmount();
    expect(mockTrack.stop).toHaveBeenCalledTimes(0);
    vi.clearAllMocks();
  });

  test("renders LayoutSwitchWithoutTrackBoundary stories", () => {
    mockUseRemoteUserTrack.mockReturnValueOnce(mockTrack);

    const { container, unmount } = render(<LayoutSwitchWithoutTrackBoundary />);
    expect(container).toBeInTheDocument();
    unmount();
    expect(mockTrack.stop).toHaveBeenCalledTimes(0);
    vi.clearAllMocks();
  });
});
