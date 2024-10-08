import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import type { VideoPlayerConfig } from "agora-rtc-sdk-ng";
import { describe, expect, test, vi } from "vitest";

import { RemoteVideoTrack } from "../../src/components";
import * as fun from "../../src/components/TrackBoundary";
import * as stories from "../../src/stories/RemoteVideoTrack.stories";
const { Enabled, EmptyTrack } = composeStories(stories);

vi.mock("../../src/components/TrackBoundary", () => ({
  useAutoPlayVideoTrack: vi.fn(),
}));

describe("RemoteVideoTrack component", () => {
  test("renders without crashing", () => {
    const { container } = render(<RemoteVideoTrack />);
    expect(container).toBeInTheDocument();
    vi.clearAllMocks();
  });

  test("config videoPlayerConfig on RemoteVideoTrack", () => {
    vi.spyOn(fun, "useAutoPlayVideoTrack");
    const videoPlayerConfig: VideoPlayerConfig = { mirror: false, fit: "cover" };
    render(<RemoteVideoTrack play videoPlayerConfig={videoPlayerConfig} />);
    expect(fun.useAutoPlayVideoTrack).toBeCalledWith(
      undefined,
      true,
      videoPlayerConfig,
      expect.anything(),
    );
    vi.clearAllMocks();
  });
});

describe("RemoteVideoTrack component stories", () => {
  test("renders Enabled stories", () => {
    const { container } = render(<Enabled />);
    expect(container).toBeInTheDocument();
  });

  test("renders EmptyTrack stories", () => {
    const { getByText } = render(<EmptyTrack />);
    expect(getByText(/An Empty Remote Video Track/i)).toBeInTheDocument();
  });
});
