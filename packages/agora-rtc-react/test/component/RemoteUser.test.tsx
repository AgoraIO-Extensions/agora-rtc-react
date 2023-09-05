import { randUuid } from "@ngneat/falso";
import { composeStories } from "@storybook/react";
import { render, waitFor } from "@testing-library/react";
import type { IRemoteAudioTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { FakeRTCClient } from "agora-rtc-sdk-ng-fake";
import { describe, expect, test, vi } from "vitest";

import { RemoteUser } from "../../src/components";
import { AgoraRTCProvider } from "../../src/hooks";
import * as clientHook from "../../src/hooks";
import * as stories from "../../src/stories/RemoteUser.stories";
const { Overview, WithCover, WithControls } = composeStories(stories);

const mockAudioTrack: IRemoteAudioTrack = {
  setVolume: vi.fn(),
  play: vi.fn(),
  stop: vi.fn(),
} as unknown as IRemoteAudioTrack;

const mockVideoTrack: IRemoteVideoTrack = {
  play: vi.fn(),
  stop: vi.fn(),
} as unknown as IRemoteVideoTrack;

describe("RemoteUser component", () => {
  beforeAll(() => {
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("renders without crashing", () => {
    const { container } = render(
      <AgoraRTCProvider client={FakeRTCClient.create()}>
        <RemoteUser />
      </AgoraRTCProvider>,
    );
    expect(container).toBeInTheDocument();
  });

  test("sets user", () => {
    const user = {
      uid: randUuid(),
      hasVideo: true,
      hasAudio: true,
    };
    const { container } = render(
      <AgoraRTCProvider client={FakeRTCClient.create()}>
        <RemoteUser cover={"test"} user={user} />
      </AgoraRTCProvider>,
    );
    expect(container).toBeInTheDocument();
    expect(container.querySelector("img")?.getAttribute("src")).toBeUndefined();
  });

  test("sets user but hasVideo is false", () => {
    const user = {
      uid: randUuid(),
      hasVideo: false,
      hasAudio: true,
    };
    const { container } = render(
      <AgoraRTCProvider client={FakeRTCClient.create()}>
        <RemoteUser cover={"test"} user={user} />
      </AgoraRTCProvider>,
    );
    expect(container).toBeInTheDocument();
    expect(container.querySelector("img")?.getAttribute("src")).toBe("test");
  });
});

describe("RemoteUser component stories", () => {
  beforeAll(() => {
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("renders Overview stories", () => {
    const { container } = render(<Overview />);
    expect(container.querySelector("div")?.style.width).toBe("288px");
    expect(container.querySelector("div")?.style.height).toBe("216px");
  });

  test("renders WithCover stories", () => {
    const { container } = render(<WithCover />);
    expect(Boolean(container.querySelector("img")?.getAttribute("src"))).toBe(true);
  });

  test("renders WithControls stories", () => {
    const { container } = render(<WithControls />);
    expect(container.querySelector(".arr-user-control")).toBeInTheDocument();
  });

  test("renders WithControls stories but playAudio=true and playVideo=false", async () => {
    const user = {
      uid: randUuid(),
      hasVideo: true,
      hasAudio: true,
      audioTrack: mockAudioTrack,
      videoTrack: mockVideoTrack,
    };
    const { rerender } = render(<WithControls playAudio playVideo={false} user={user} />);
    await waitFor(() => {
      expect(mockVideoTrack.play).toBeCalledTimes(0);
      expect(mockVideoTrack.stop).toBeCalledTimes(2);
      expect(mockAudioTrack.play).toHaveBeenCalledTimes(1);
      expect(mockAudioTrack.stop).toBeCalledTimes(0);
    });
    rerender(<WithControls playAudio={false} playVideo user={user} />);
    await waitFor(() => {
      expect(mockVideoTrack.play).toBeCalledTimes(1);
      expect(mockVideoTrack.stop).toBeCalledTimes(2);
      expect(mockAudioTrack.play).toHaveBeenCalledTimes(1);
      expect(mockAudioTrack.stop).toBeCalledTimes(1);
    });
  });
});
