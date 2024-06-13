import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import * as fun from "agora-rtc-react/src/components/TrackBoundary";
import type { VideoPlayerConfig } from "agora-rtc-sdk-ng";
import { FakeRTCClient, FakeRemoteVideoTrack } from "agora-rtc-sdk-ng-fake";
import { describe, expect, test, vi } from "vitest";

import { RemoteVideoPlayer } from "../src/components";
import * as stories from "../src/stories/RemoteVideoPlayer.stories";
const { Overview, WithCover } = composeStories(stories);

vi.mock("agora-rtc-react/src/components/TrackBoundary", () => ({
  useAutoPlayVideoTrack: vi.fn(),
}));

describe("RemoteVideoPlayer component", () => {
  test("renders without crashing", () => {
    const client = FakeRTCClient.create();
    const { container } = render(<RemoteVideoPlayer client={client} />);
    expect(container).toBeInTheDocument();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test("config videoPlayerConfig on RemoteVideoPlayer", () => {
    const client = FakeRTCClient.create();
    const track = FakeRemoteVideoTrack.create();
    vi.spyOn(fun, "useAutoPlayVideoTrack");
    const videoPlayerConfig: VideoPlayerConfig = { mirror: false, fit: "cover" };
    render(
      <RemoteVideoPlayer
        client={client}
        playVideo
        track={track}
        videoPlayerConfig={videoPlayerConfig}
      />,
    );
    expect(fun.useAutoPlayVideoTrack).toBeCalledWith(
      track,
      true,
      videoPlayerConfig,
      expect.anything(),
    );
    vi.clearAllMocks();
  });
});

describe("RemoteVideoPlayer component stories", () => {
  test("renders Overview stories", () => {
    const client = FakeRTCClient.create();
    const { container } = render(<Overview client={client} />);
    expect(container).toBeInTheDocument();
    expect(container.querySelector("img")?.getAttribute("src")).toBeUndefined();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test("renders WithCover stories", () => {
    const client = FakeRTCClient.create();
    const { container } = render(<WithCover client={client} />);
    expect(Boolean(container.querySelector("img")?.getAttribute("src"))).toBe(true);
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
});
