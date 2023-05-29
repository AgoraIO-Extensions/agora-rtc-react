import { act, renderHook, waitFor } from "@testing-library/react";
import type { IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { FakeRTCClient, dispatchRTCEvent } from "fake-agora-rtc";
import { expect } from "vitest";

import { usePublishedRemoteUsers } from "../../src/hooks/index";

const setUp = (client?: IAgoraRTCClient | null) =>
  renderHook(() => usePublishedRemoteUsers(client));

describe("usePublishedRemoteUsers", () => {
  const user1 = { uid: "1", hasAudio: true, hasVideo: true };
  const user2 = { uid: "1", hasAudio: true, hasVideo: false };
  const user3 = { uid: "1", hasAudio: false, hasVideo: true };
  const user4 = { uid: "1", hasAudio: false, hasVideo: false };
  test("should return user list when the provided client", () => {
    const client = FakeRTCClient.create();
    (client.remoteUsers as IAgoraRTCRemoteUser[]) = [user1, user1];
    const { result } = setUp(client);
    expect(result.current).toEqual(client.remoteUsers);
  });

  test("should return particular user list", async () => {
    const client = FakeRTCClient.create();
    (client.remoteUsers as IAgoraRTCRemoteUser[]) = [user4, user1];
    const { result } = setUp(client);
    await waitFor(() => {
      expect(result.current.length).toBe(1);
    });
  });

  test("should return particular user list", async () => {
    const client = FakeRTCClient.create();
    (client.remoteUsers as IAgoraRTCRemoteUser[]) = [user4, user4];
    const { result } = setUp(client);
    await waitFor(() => {
      expect(result.current.length).toBe(0);
    });
  });
  test("should return updated user list when user-joined", async () => {
    const client = FakeRTCClient.create();
    const { result } = setUp(client);
    act(() => {
      (client.remoteUsers as IAgoraRTCRemoteUser[]) = [user2];
      dispatchRTCEvent(client, "user-joined");
    });
    await waitFor(() => {
      expect(result.current.length).toBe(client.remoteUsers.length);
    });
  });

  test("should return updated user list when user-left", async () => {
    const client = FakeRTCClient.create();
    const { result } = setUp(client);
    act(() => {
      (client.remoteUsers as IAgoraRTCRemoteUser[]) = [];
      dispatchRTCEvent(client, "user-left");
    });
    await waitFor(() => {
      expect(result.current.length).toBe(0);
    });
  });

  test("should return updated user list when user-published", async () => {
    const client = FakeRTCClient.create();
    const { result } = setUp(client);
    act(() => {
      (client.remoteUsers as IAgoraRTCRemoteUser[]) = [user1];
      dispatchRTCEvent(client, "user-published");
    });
    await waitFor(() => {
      expect(result.current.length).toBe(client.remoteUsers.length);
    });
  });

  test("should return updated user list when user-unpublished", async () => {
    const client = FakeRTCClient.create();
    const { result } = setUp(client);
    act(() => {
      (client.remoteUsers as IAgoraRTCRemoteUser[]) = [user1, user2, user3];
      dispatchRTCEvent(client, "user-unpublished");
    });
    await waitFor(() => {
      expect(result.current.length).toBe(client.remoteUsers.length);
    });
  });
});
