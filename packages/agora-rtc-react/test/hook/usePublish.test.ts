import { renderHook, waitFor } from "@testing-library/react";
import { FakeCameraVideoTrack, FakeMicrophoneAudioTrack, FakeRTCClient } from "fake-agora-rtc";
import { expect, vi } from "vitest";

import * as clientHook from "../../src/hooks/client";
import { usePublish } from "../../src/hooks/index";
import { createWrapper } from "../setup";

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
});
