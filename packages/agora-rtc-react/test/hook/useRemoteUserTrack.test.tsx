import { renderHook, waitFor } from "@testing-library/react";
import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { FakeRTCClient, dispatchRTCEvent } from "agora-rtc-sdk-ng-fake";
import { act } from "react-dom/test-utils";
import { vi } from "vitest";

import { errorMessage } from "../../../shared/test/setup/agora";
import { createWrapper } from "../../../shared/test/setup/wrapper";
import * as clientHook from "../../src/hooks/useIsConnected";
import { useRemoteUserTrack } from "../../src/hooks/useRemoteUserTrack";

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
      expect(result.current.track).not.toBeNull();
      expect(result.current.track).not.toBeUndefined();
      expect(result.current.track?.trackMediaType).toBe("video");
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
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
      expect(result.current.track).not.toBeNull();
      expect(result.current.track).not.toBeUndefined();
      expect(result.current.track?.trackMediaType).toBe("audio");
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
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
      expect(result.current.track).not.toBeNull();
      expect(result.current.track).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    act(() => {
      dispatchRTCEvent(client, "user-published", user, "video");
    });
    await waitFor(() => {
      expect(spy).toBeCalled();
      expect(spy3).toBeCalledTimes(1);
      expect(spy3).toBeCalledWith(user, "video");
      expect(result.current.track).not.toBeNull();
      expect(result.current.track).not.toBeUndefined();
      expect(result.current.track?.trackMediaType).toBe("video");
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
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
      expect(result.current.track).not.toBeNull();
      expect(result.current.track).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  test("should return log error when unsubscribe is failed", async () => {
    const client = FakeRTCClient.create();
    const spy2 = vi.spyOn(client, "unsubscribe").mockReturnValue(Promise.reject(errorMessage));
    const spy3 = vi.spyOn(console, "error");

    (client.remoteUsers as IAgoraRTCRemoteUser[]) = [user];

    const { result } = renderHook(() => useRemoteUserTrack(user, "video", client), {
      wrapper: createWrapper(client),
    });
    act(() => {
      dispatchRTCEvent(client, "user-unpublished", user, "video");
    });
    await waitFor(() => {
      expect(spy2).toBeCalledTimes(1);
      expect(spy3).toHaveBeenCalledWith(errorMessage);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.rtcMethod).toBe("IAgoraRTCClient.unsubscribe");
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

    const { result } = renderHook(() => useRemoteUserTrack(newUser, "video", client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(spy2).toBeCalledTimes(1);
      expect(spy3).toHaveBeenCalledWith(errorMessage);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.rtcMethod).toBe("IAgoraRTCClient.subscribe");
    });
  });
});
