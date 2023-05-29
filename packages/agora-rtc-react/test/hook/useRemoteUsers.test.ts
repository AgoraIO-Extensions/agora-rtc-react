import { act, renderHook, waitFor } from "@testing-library/react";
import type { IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { FakeRTCClient, dispatchRTCEvent } from "fake-agora-rtc";
import { expect } from "vitest";

import { useRemoteUsers } from "../../src/hooks/index";
const setUp = (client?: IAgoraRTCClient | null) => renderHook(() => useRemoteUsers(client));

describe("useRemoteUsers", () => {
  const userList = [{ uid: "1", hasAudio: true, hasVideo: true }];

  test("should return user list when the provided client", () => {
    const client = FakeRTCClient.create();
    const { result } = setUp(client);
    waitFor(() => {
      expect(result.current).toEqual(client.remoteUsers);
    });
  });

  test("should return user list when user-joined", async () => {
    const client = FakeRTCClient.create();
    const { result } = setUp(client);
    act(() => {
      (client.remoteUsers as IAgoraRTCRemoteUser[]) = [];
      dispatchRTCEvent(client, "user-left");
    });
    expect(result.current.length).toBe(0);
  });

  test("should return user list when user-left", async () => {
    const client = FakeRTCClient.create();
    (client.remoteUsers as IAgoraRTCRemoteUser[]) = userList;

    const { result } = setUp(client);
    act(() => {
      (client.remoteUsers as IAgoraRTCRemoteUser[]) = [];
      dispatchRTCEvent(client, "user-left");
    });
    expect(result.current.length).toBe(0);
  });
});
