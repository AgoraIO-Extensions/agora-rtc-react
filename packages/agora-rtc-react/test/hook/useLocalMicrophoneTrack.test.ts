import { renderHook, waitFor } from "@testing-library/react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { FakeMicrophoneAudioTrack, FakeRTCClient } from "fake-agora-rtc";
import { expect, vi } from "vitest";

import * as clientHook from "../../src/hooks/client";
import { useLocalMicrophoneTrack } from "../../src/hooks/index";
import { createWrapper } from "../setup";

describe("useLocalMicrophoneTrack", () => {
  const spy = vi.spyOn(clientHook, "useIsConnected");
  beforeAll(() => {
    spy.mockReturnValue(true);
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("should return null when ready is false", async () => {
    const client = FakeRTCClient.create();
    const { result } = renderHook(() => useLocalMicrophoneTrack(false), {
      wrapper: createWrapper(client),
    });
    waitFor(() => {
      expect(result.current).toBeNull();
    });
  });

  test("should return ICameraVideoTrack when ready is true", async () => {
    const client = FakeRTCClient.create();
    vi.spyOn(AgoraRTC, "createMicrophoneAudioTrack").mockReturnValue(
      Promise.resolve(FakeMicrophoneAudioTrack.create()),
    );
    const { result } = renderHook(() => useLocalMicrophoneTrack(true), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(AgoraRTC.createMicrophoneAudioTrack).toBeCalledTimes(1);
      expect(result.current !== null).toBe(true);
    });
  });

  test("should return null when ready is true but client is disconnected", async () => {
    const client = FakeRTCClient.create();
    vi.spyOn(AgoraRTC, "createMicrophoneAudioTrack").mockReturnValue(
      Promise.resolve(FakeMicrophoneAudioTrack.create()),
    );
    const { result, rerender } = renderHook(() => useLocalMicrophoneTrack(true), {
      wrapper: createWrapper(client),
    });

    spy.mockReturnValue(false);
    rerender();

    await waitFor(() => {
      expect(result.current).toBeNull();
    });
  });
});
