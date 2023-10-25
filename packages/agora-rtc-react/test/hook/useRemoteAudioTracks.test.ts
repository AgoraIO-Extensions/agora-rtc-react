import { act, renderHook, waitFor } from "@testing-library/react";
import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { FakeRTCClient, dispatchRTCEvent } from "agora-rtc-sdk-ng-fake";
import { vi } from "vitest";

import { errorMessage } from "../../../shared/test/setup/agora";
import { createWrapper } from "../../../shared/test/setup/wrapper";
import * as clientHook from "../../src/hooks/useIsConnected";
import { useRemoteAudioTracks } from "../../src/hooks/useRemoteAudioTracks";

describe("useRemoteAudioTracks", () => {
  test("should return audio tracks", async () => {
    const userList = [{ uid: "1", hasAudio: true, hasVideo: true }];
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
    const spy2 = vi.spyOn(client, "subscribe");

    const { result } = renderHook(() => useRemoteAudioTracks(userList, client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(spy2).toBeCalledTimes(1);
      expect(spy2).toBeCalledWith(userList[0], "audio");
      expect(result.current).not.toBeNull();
      expect(result.current).not.toBeUndefined();
      expect(result.current.audioTracks.length).toBe(userList.length);
    });
    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  test("should return error log when subscribe is failed", async () => {
    const userList = [{ uid: "1", hasAudio: true, hasVideo: true }];
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
    const spy2 = vi.spyOn(client, "subscribe").mockReturnValue(Promise.reject(errorMessage));
    const spy3 = vi.spyOn(console, "error");

    const { result } = renderHook(() => useRemoteAudioTracks(userList, client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      expect(spy2).toBeCalledTimes(1);
      expect(spy2).toBeCalledWith(userList[0], "audio");
      expect(spy3).toHaveBeenCalledWith(errorMessage);
      expect(result.current.error).not.toBeNull();
      expect(result.current.error).not.toBeUndefined();
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.rtcMethod).toBe("IAgoraRTCClient.subscribe");
    });
    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  test("should return error log when unsubscribe is failed", async () => {
    const userList = [{ uid: "1", hasAudio: true, hasVideo: true }];
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
    const spy2 = vi.spyOn(client, "unsubscribe").mockRejectedValue(new Error());
    const spy3 = vi.spyOn(console, "error");
    (client.remoteUsers as IAgoraRTCRemoteUser[]) = userList;

    const { result } = renderHook(() => useRemoteAudioTracks(userList, client), {
      wrapper: createWrapper(client),
    });
    await waitFor(() => {
      userList[0].uid = result.current.audioTracks[0].getTrackId();
      (client.remoteUsers as IAgoraRTCRemoteUser[]) = userList;
    });
    act(() => {
      dispatchRTCEvent(client, "user-unpublished", userList[0], "audio");
    });
    await waitFor(async () => {
      expect(spy2).toBeCalledTimes(1);
      expect(spy3).toHaveBeenCalledTimes(1);
      await expect(spy2).rejects.toThrowError();
      expect(result.current.error).not.toBeNull();
      expect(result.current.error).not.toBeUndefined();
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.rtcMethod).toBe("IAgoraRTCClient.unsubscribe");
    });

    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  test("should return error log when massUnsubscribe is failed", async () => {
    const userList = [{ uid: "1", hasAudio: true, hasVideo: true }];
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
    const spy2 = vi.spyOn(client, "massUnsubscribe").mockRejectedValue(new Error());
    const spy3 = vi.spyOn(console, "error");
    (client.remoteUsers as IAgoraRTCRemoteUser[]) = userList;

    const { result, rerender } = renderHook(
      ({ userList, client }) => useRemoteAudioTracks(userList, client),
      {
        initialProps: { userList: userList, client: client },
        wrapper: createWrapper(client),
      },
    );

    await waitFor(() => {
      expect(result.current.audioTracks.length).toBe(userList.length);
      userList[0].uid = result.current.audioTracks[0].getUserId().toString();
      (client.remoteUsers as IAgoraRTCRemoteUser[]) = userList;
    });

    rerender({ userList: [], client: client });

    await waitFor(async () => {
      expect(spy2).toBeCalledTimes(1);
      expect(spy3).toHaveBeenCalledTimes(1);
      await expect(spy2).rejects.toThrowError();
      expect(result.current.error).not.toBeNull();
      expect(result.current.error).not.toBeUndefined();
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.rtcMethod).toBe("IAgoraRTCClient.massUnsubscribe");
    });

    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  test("should return [] when unsubscribe", async () => {
    const userList = [{ uid: "1", hasAudio: true, hasVideo: true }];
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
    const spy2 = vi.spyOn(client, "unsubscribe");
    const spy3 = vi.spyOn(client, "subscribe");
    (client.remoteUsers as IAgoraRTCRemoteUser[]) = userList;

    const { result } = renderHook(
      ({ userList, client }) => useRemoteAudioTracks(userList, client),
      {
        initialProps: { userList: userList, client: client },
        wrapper: createWrapper(client),
      },
    );
    await waitFor(() => {
      expect(spy2).toBeCalledTimes(0);
      expect(result.current.audioTracks.length).toBe(userList.length);
      userList[0].uid = result.current.audioTracks[0].getTrackId();
      (client.remoteUsers as IAgoraRTCRemoteUser[]) = userList;
    });
    act(() => {
      dispatchRTCEvent(client, "user-unpublished", userList[0], "audio");
    });
    await waitFor(() => {
      expect(spy2).toBeCalledTimes(1);
      expect(spy3).toBeCalledTimes(1);
    });

    act(() => {
      dispatchRTCEvent(client, "user-published", userList[0], "audio");
    });
    await waitFor(() => {
      expect(spy3).toBeCalledTimes(2);
    });

    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  test("should return [] when change userList to []", async () => {
    const userList = [{ uid: "1", hasAudio: true, hasVideo: true }];
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    client.massUnsubscribe = vi.fn().mockReturnValue(Promise.resolve());
    spy.mockReturnValue(true);
    (client.remoteUsers as IAgoraRTCRemoteUser[]) = userList;

    const { result, rerender } = renderHook(
      ({ userList, client }) => useRemoteAudioTracks(userList, client),
      {
        initialProps: { userList: userList, client: client },
        wrapper: createWrapper(client),
      },
    );
    await waitFor(() => {
      expect(result.current.audioTracks.length).toBe(userList.length);
      userList[0].uid = result.current.audioTracks[0].getUserId().toString();
      (client.remoteUsers as IAgoraRTCRemoteUser[]) = userList;
    });

    rerender({ userList: [], client: client });
    await waitFor(() => {
      expect(client.massUnsubscribe).toBeCalledTimes(1);
      expect(result.current).not.toBeNull();
      expect(result.current).not.toBeUndefined();
      expect(Array.isArray(result.current.audioTracks)).toBe(true);
      expect(result.current.audioTracks.length).toBe(0);
    });
    vi.resetAllMocks();
    vi.clearAllMocks();
  });
});
