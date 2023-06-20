import { renderHook, waitFor } from "@testing-library/react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { FakeCameraVideoTrack, FakeRTCClient } from "fake-agora-rtc";
import { expect, vi } from "vitest";

import * as clientHook from "../../src/hooks/client";
import { useLocalCameraTrack } from "../../src/hooks/index";
import { createWrapper, errorMessage } from "../setup";

describe("useLocalCameraTrack", () => {
  test("should return null when ready is false", async () => {
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
    const { result } = renderHook(() => useLocalCameraTrack(false, client), {
      wrapper: createWrapper(client),
    });
    waitFor(() => {
      expect(result.current.localCameraTrack).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test("should return ICameraVideoTrack when ready is true", async () => {
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
    vi.spyOn(AgoraRTC, "createCameraVideoTrack").mockReturnValue(
      Promise.resolve(FakeCameraVideoTrack.create()),
    );
    const { result } = renderHook(() => useLocalCameraTrack(true, client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(AgoraRTC.createCameraVideoTrack).toBeCalledTimes(1);
      expect(result.current.localCameraTrack !== null).toBe(true);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test("should return null when ready is true but client is disconnected", async () => {
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
    vi.spyOn(AgoraRTC, "createCameraVideoTrack").mockReturnValue(
      Promise.resolve(FakeCameraVideoTrack.create()),
    );
    const { result, rerender } = renderHook(() => useLocalCameraTrack(true, client), {
      wrapper: createWrapper(client),
    });

    spy.mockReturnValue(false);
    rerender();

    await waitFor(() => {
      expect(result.current.localCameraTrack).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test("should return log error when create failed", async () => {
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
    const spy2 = vi
      .spyOn(AgoraRTC, "createCameraVideoTrack")
      .mockRejectedValue(new Error(errorMessage));
    const spy3 = vi.spyOn(console, "error");

    const { result } = renderHook(() => useLocalCameraTrack(true, client), {
      wrapper: createWrapper(client),
    });

    await waitFor(() => {
      expect(spy2).toBeCalledTimes(1);
      expect(spy3).toHaveBeenCalledTimes(1);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeInstanceOf(Error);
    });
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
});
