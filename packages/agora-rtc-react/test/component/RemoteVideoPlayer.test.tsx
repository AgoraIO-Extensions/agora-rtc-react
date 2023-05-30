import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import type { Mock } from "vitest";
import { describe, expect, test, vi } from "vitest";

import { RemoteVideoPlayer } from "../../src/components";
import * as stories from "../../src/components/RemoteVideoPlayer.stories";
import { useRTCClient } from "../../src/hooks";
const { Overview, WithCover } = composeStories(stories);

vi.mock("../../src/hooks", () => ({
  useRTCClient: vi.fn(),
}));

vi.mock("../../src/components/TrackBoundary", () => ({
  useAutoPlayVideoTrack: vi.fn(),
}));

const mockClient: IAgoraRTCClient = {
  remoteUsers: [],
} as unknown as IAgoraRTCClient;
const mockUseRTCClient = useRTCClient as Mock;

describe("RemoteVideoPlayer component", () => {
  test("renders without crashing", () => {
    mockUseRTCClient.mockReturnValueOnce(mockClient);
    const { container } = render(<RemoteVideoPlayer client={mockClient} />);
    expect(container).toBeInTheDocument();
    vi.clearAllMocks();
  });
});

describe("RemoteVideoPlayer component stories", () => {
  test("renders Overview stories", () => {
    mockUseRTCClient.mockReturnValueOnce(mockClient);
    const { container } = render(<Overview client={mockClient} />);
    expect(container).toBeInTheDocument();
    expect(container.querySelector("img")?.getAttribute("src")).toBeUndefined();
  });

  test("renders WithCover stories", () => {
    mockUseRTCClient.mockReturnValueOnce(mockClient);
    const { container } = render(<WithCover client={mockClient} />);
    expect(Boolean(container.querySelector("img")?.getAttribute("src"))).toBe(true);
  });
});
