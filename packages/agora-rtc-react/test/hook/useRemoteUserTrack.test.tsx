import { renderHook, waitFor } from "@testing-library/react";
import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { FakeRTCClient, dispatchRTCEvent } from "fake-agora-rtc";
import { act } from "react-dom/test-utils";
import { vi } from "vitest";

import * as clientHook from "../../src/hooks/client";
import { useRemoteUserTrack } from "../../src/hooks/index";
import { createWrapper } from "../setup";

const user = {
  uid: "1",
  hasAudio: true,
  hasVideo: true,
};

describe("useRemoteUserTrack", () => {
  const spy = vi.spyOn(clientHook, "useIsConnected");
  beforeAll(() => {
    spy.mockReturnValue(true);
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("should return IRemoteVideoTrack", async () => {
    const client = FakeRTCClient.create();
    const spy2 = vi.spyOn(client, "subscribe");

    (client.remoteUsers as IAgoraRTCRemoteUser[]) = [user];

    const { result } = renderHook(() => useRemoteUserTrack(user, "video", client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(spy).toBeCalled();
      expect(spy2).toBeCalledTimes(1);
      expect(result.current?.trackMediaType).toBe("video");
    });
  });

  test("should return IRemoteAudioTrack", async () => {
    const client = FakeRTCClient.create();
    const spy2 = vi.spyOn(client, "subscribe");

    (client.remoteUsers as IAgoraRTCRemoteUser[]) = [user];

    const { result } = renderHook(() => useRemoteUserTrack(user, "audio", client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(spy).toBeCalled();
      expect(spy2).toBeCalledTimes(1);
      expect(result.current?.trackMediaType).toBe("audio");
    });
  });

  test("should return null when user-unpublished", async () => {
    const client = FakeRTCClient.create();
    const spy2 = vi.spyOn(client, "unsubscribe");

    (client.remoteUsers as IAgoraRTCRemoteUser[]) = [user];

    const { result } = renderHook(() => useRemoteUserTrack(user, "video", client), {
      wrapper: createWrapper(client),
    });
    act(() => {
      dispatchRTCEvent(client, "user-unpublished", user, "video");
    });
    await waitFor(() => {
      expect(spy).toBeCalled();
      expect(spy2).toBeCalledTimes(1);
      expect(result.current?.trackMediaType).toBeUndefined();
    });
  });

  test("should return null when user-unpublished", async () => {
    const client = FakeRTCClient.create();
    const spy2 = vi.spyOn(client, "unsubscribe");

    (client.remoteUsers as IAgoraRTCRemoteUser[]) = [user];

    const { result } = renderHook(() => useRemoteUserTrack(user, "audio", client), {
      wrapper: createWrapper(client),
    });
    act(() => {
      dispatchRTCEvent(client, "user-unpublished", user, "audio");
    });
    await waitFor(() => {
      expect(spy).toBeCalled();
      expect(spy2).toBeCalledTimes(1);
      expect(result.current?.trackMediaType).toBeUndefined();
    });
  });
});
