import { renderHook, waitFor } from "@testing-library/react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { FakeCameraVideoTrack, FakeRTCClient } from "fake-agora-rtc";
import { expect, vi } from "vitest";

import * as clientHook from "../../src/hooks/client";
import { useLocalCameraTrack } from "../../src/hooks/index";
import { createWrapper } from "../setup/wrapper";

describe("useLocalCameraTrack", () => {
  const spy = vi.spyOn(clientHook, "useIsConnected");
  beforeAll(() => {
    spy.mockReturnValue(true);
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("should return null when ready is false", async () => {
    const client = FakeRTCClient.create();
    const { result } = renderHook(() => useLocalCameraTrack(false, client), {
      wrapper: createWrapper(client),
    });
    waitFor(() => {
      expect(result.current).toBeNull();
    });
  });

  test("should return ICameraVideoTrack when ready is true", async () => {
    const client = FakeRTCClient.create();
    vi.spyOn(AgoraRTC, "createCameraVideoTrack").mockReturnValue(
      Promise.resolve(FakeCameraVideoTrack.create()),
    );
    const { result } = renderHook(() => useLocalCameraTrack(true, client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(AgoraRTC.createCameraVideoTrack).toBeCalledTimes(1);
      expect(result.current !== null).toBe(true);
    });
  });

  test("should return null when ready is true but client is disconnected", async () => {
    const client = FakeRTCClient.create();
    vi.spyOn(AgoraRTC, "createCameraVideoTrack").mockReturnValue(
      Promise.resolve(FakeCameraVideoTrack.create()),
    );
    const { result, rerender } = renderHook(() => useLocalCameraTrack(true, client), {
      wrapper: createWrapper(client),
    });

    spy.mockReturnValue(false);
    rerender();

    await waitFor(() => {
      expect(result.current).toBeNull();
    });
  });
});
