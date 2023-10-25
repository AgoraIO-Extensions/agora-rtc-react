import { renderHook, waitFor } from "@testing-library/react";
import {
  FakeCameraVideoTrack,
  FakeMicrophoneAudioTrack,
  FakeRTCClient,
} from "agora-rtc-sdk-ng-fake";
import { expect, vi } from "vitest";

import { errorMessage } from "../../../shared/test/setup/agora";
import { createWrapper } from "../../../shared/test/setup/wrapper";
import * as clientHook from "../../src/hooks/useIsConnected";
import { usePublish } from "../../src/hooks/usePublish";

describe("usePublish", () => {
  const spy = vi.spyOn(clientHook, "useIsConnected");
  beforeAll(() => {
    spy.mockReturnValue(true);
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("should not publish track because of ready is false", async () => {
    const client = FakeRTCClient.create();
    const tracks = [FakeMicrophoneAudioTrack.create(), FakeCameraVideoTrack.create()];
    client.publish = vi.fn().mockReturnValue(Promise.resolve());
    const { result } = renderHook(() => usePublish(tracks, false, client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(client.publish).toHaveBeenCalledTimes(0);
      expect(result.current.error).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });
  });

  test("should publish track because of ready is true", async () => {
    const client = FakeRTCClient.create();
    const tracks = [FakeMicrophoneAudioTrack.create(), FakeCameraVideoTrack.create()];
    client.publish = vi.fn().mockReturnValue(Promise.resolve());
    const { result } = renderHook(() => usePublish(tracks, true, client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(client.publish).toHaveBeenCalledTimes(tracks.length);
      expect(result.current.error).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });
  });

  test("should return error log when publish is failed", async () => {
    const client = FakeRTCClient.create();
    const tracks = [FakeMicrophoneAudioTrack.create(), FakeCameraVideoTrack.create()];
    client.publish = vi.fn().mockReturnValue(Promise.reject(errorMessage));
    const spy = vi.spyOn(console, "error");

    const { result } = renderHook(() => usePublish(tracks, true, client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(client.publish).toHaveBeenCalledTimes(tracks.length);
      expect(spy).toHaveBeenCalledWith(errorMessage);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.rtcMethod).toBe("IAgoraRTCClient.publish");
      expect(result.current.isLoading).toBe(false);
    });
  });
});
