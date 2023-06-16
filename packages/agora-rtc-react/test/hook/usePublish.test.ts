import { renderHook, waitFor } from "@testing-library/react";
import { FakeCameraVideoTrack, FakeMicrophoneAudioTrack, FakeRTCClient } from "fake-agora-rtc";
import { expect, vi } from "vitest";

import * as clientHook from "../../src/hooks/client";
import { usePublish } from "../../src/hooks/index";
import { errorMessage } from "../setup/agora";
import { createWrapper } from "../setup/wrapper";

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
    renderHook(() => usePublish(tracks, false, client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(client.publish).toHaveBeenCalledTimes(0);
    });
  });

  test("should publish track because of ready is true", async () => {
    const client = FakeRTCClient.create();
    const tracks = [FakeMicrophoneAudioTrack.create(), FakeCameraVideoTrack.create()];
    client.publish = vi.fn().mockReturnValue(Promise.resolve());
    renderHook(() => usePublish(tracks, true, client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(client.publish).toHaveBeenCalledTimes(tracks.length);
    });
  });

  test("should return error log when publish is failed", async () => {
    const client = FakeRTCClient.create();
    const tracks = [FakeMicrophoneAudioTrack.create(), FakeCameraVideoTrack.create()];
    client.publish = vi.fn().mockReturnValue(Promise.reject(errorMessage));
    const spy = vi.spyOn(console, "error");

    renderHook(() => usePublish(tracks, true, client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(client.publish).toHaveBeenCalledTimes(tracks.length);
      expect(spy).toHaveBeenCalledWith(errorMessage);
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
