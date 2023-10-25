import { renderHook, waitFor } from "@testing-library/react";
import AgoraRTC from "agora-rtc-sdk-ng";
import {
  FakeCameraVideoTrack,
  FakeLocalAudioTrack,
  FakeLocalVideoTrack,
  FakeRTCClient,
} from "agora-rtc-sdk-ng-fake";
import { expect, vi } from "vitest";

import { errorMessage } from "../../../shared/test/setup/agora";
import { createWrapper } from "../../../shared/test/setup/wrapper";
import { useLocalScreenTrack } from "../../src/hooks/index";
import * as clientHook from "../../src/hooks/useIsConnected";

describe("useLocalScreenTrack", () => {
  test("should return null when ready is false", async () => {
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
    const { result } = renderHook(() => useLocalScreenTrack(false, {}, "auto", client), {
      wrapper: createWrapper(client),
    });
    waitFor(() => {
      expect(result.current.screenTrack).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test("should return ILocalVideoTrack when ready is true and withAudio is disable", async () => {
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
    vi.spyOn(AgoraRTC, "createScreenVideoTrack").mockReturnValue(
      Promise.resolve(FakeLocalVideoTrack.create()),
    );
    const { result } = renderHook(() => useLocalScreenTrack(true, {}, "disable", client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(AgoraRTC.createScreenVideoTrack).toBeCalledTimes(1);
      expect(result.current.screenTrack !== null).toBe(true);
      expect(Array.isArray(result.current.screenTrack)).toBe(false);
      expect(result.current.screenTrack?.trackMediaType).toBe("video");
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test("should return ILocalVideoTrack and ILocalAudioTrack when ready is true and withAudio is enable", async () => {
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
    vi.spyOn(AgoraRTC, "createScreenVideoTrack").mockReturnValue(
      Promise.resolve([FakeLocalVideoTrack.create(), FakeLocalAudioTrack.create()]),
    );
    const { result } = renderHook(() => useLocalScreenTrack(true, {}, "enable", client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(AgoraRTC.createScreenVideoTrack).toBeCalledTimes(1);
      expect(result.current.screenTrack !== null).toBe(true);
      expect(Array.isArray(result.current.screenTrack)).toBe(true);
      expect(result.current.screenTrack?.[0].trackMediaType).toBe("video");
      expect(result.current.screenTrack?.[1].trackMediaType).toBe("audio");

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test("should return ILocalVideoTrack and ILocalAudioTrack when ready is true and withAudio is auto", async () => {
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
    vi.spyOn(AgoraRTC, "createScreenVideoTrack").mockReturnValue(
      Promise.resolve([FakeLocalVideoTrack.create(), FakeLocalAudioTrack.create()]),
    );
    const { result } = renderHook(() => useLocalScreenTrack(true, {}, "auto", client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(AgoraRTC.createScreenVideoTrack).toBeCalledTimes(1);
      expect(result.current.screenTrack !== null).toBe(true);
      expect(Array.isArray(result.current.screenTrack)).toBe(true);
      expect(
        Array.isArray(result.current.screenTrack) && result.current.screenTrack[0].trackMediaType,
      ).toBe("video");
      expect(
        Array.isArray(result.current.screenTrack) && result.current.screenTrack[1].trackMediaType,
      ).toBe("audio");

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
    vi.spyOn(AgoraRTC, "createScreenVideoTrack").mockReturnValue(
      Promise.resolve(FakeCameraVideoTrack.create()),
    );
    const { result, rerender } = renderHook(() => useLocalScreenTrack(true, {}, "auto", client), {
      wrapper: createWrapper(client),
    });

    spy.mockReturnValue(false);
    rerender();

    await waitFor(() => {
      expect(result.current.screenTrack).toBeNull();
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
      .spyOn(AgoraRTC, "createScreenVideoTrack")
      .mockRejectedValue(new Error(errorMessage));
    const spy3 = vi.spyOn(console, "error");

    const { result } = renderHook(() => useLocalScreenTrack(true, {}, "auto", client), {
      wrapper: createWrapper(client),
    });

    await waitFor(() => {
      expect(spy2).toBeCalledTimes(1);
      expect(spy3).toHaveBeenCalledTimes(1);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.rtcMethod).toBe("IAgoraRTC.createScreenVideoTrack");
    });
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
});
