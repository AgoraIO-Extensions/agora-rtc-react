import { renderHook, waitFor } from "@testing-library/react";
import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { FakeRTCClient, dispatchRTCEvent } from "fake-agora-rtc";
import { act } from "react-dom/test-utils";
import { vi } from "vitest";

import * as clientHook from "../../src/hooks/client";
import { useRemoteUserTrack } from "../../src/hooks/index";
import { errorMessage } from "../setup/agora";
import { createWrapper } from "../setup/wrapper";

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
      expect(spy2).toBeCalledWith(user, "video");
      expect(result.current).not.toBeNull();
      expect(result.current).not.toBeUndefined();
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
      expect(spy2).toBeCalledWith(user, "audio");
      expect(result.current).not.toBeNull();
      expect(result.current).not.toBeUndefined();
      expect(result.current?.trackMediaType).toBe("audio");
    });
  });

  test("should return undefined when user-unpublished", async () => {
    const client = FakeRTCClient.create();
    const spy2 = vi.spyOn(client, "unsubscribe");
    const spy3 = vi.spyOn(client, "subscribe");

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
      expect(spy2).toBeCalledWith(user, "video");
      expect(result.current).not.toBeNull();
      expect(result.current).toBeUndefined();
    });

    act(() => {
      dispatchRTCEvent(client, "user-published", user, "video");
    });
    await waitFor(() => {
      expect(spy).toBeCalled();
      expect(spy3).toBeCalledTimes(1);
      expect(spy3).toBeCalledWith(user, "video");
      expect(result.current).not.toBeNull();
      expect(result.current).not.toBeUndefined();
      expect(result.current?.trackMediaType).toBe("video");
    });
  });

  test("should return undefined when user-unpublished", async () => {
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
      expect(spy2).toBeCalledWith(user, "audio");
      expect(result.current).not.toBeNull();
      expect(result.current).toBeUndefined();
    });
  });

  test("should return log error when unsubscribe is failed", async () => {
    const client = FakeRTCClient.create();
    const spy2 = vi.spyOn(client, "unsubscribe").mockReturnValue(Promise.reject(errorMessage));
    const spy3 = vi.spyOn(console, "error");

    (client.remoteUsers as IAgoraRTCRemoteUser[]) = [user];

    renderHook(() => useRemoteUserTrack(user, "video", client), {
      wrapper: createWrapper(client),
    });
    act(() => {
      dispatchRTCEvent(client, "user-unpublished", user, "video");
    });
    await waitFor(() => {
      expect(spy2).toBeCalledTimes(1);
      expect(spy3).toHaveBeenCalledWith(errorMessage);
    });
  });

  test("should return log error when subscribe is failed", async () => {
    const client = FakeRTCClient.create();
    const spy2 = vi.spyOn(client, "subscribe").mockReturnValue(Promise.reject(errorMessage));
    const spy3 = vi.spyOn(console, "error");
    const newUser = {
      uid: "2",
      hasAudio: true,
      hasVideo: true,
    };
    (client.remoteUsers as IAgoraRTCRemoteUser[]) = [newUser];

    renderHook(() => useRemoteUserTrack(newUser, "video", client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(spy2).toBeCalledTimes(1);
      expect(spy3).toHaveBeenCalledWith(errorMessage);
    });
  });
});
