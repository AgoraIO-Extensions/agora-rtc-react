import { act, renderHook, waitFor } from "@testing-library/react";
import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { FakeRTCClient, dispatchRTCEvent } from "agora-rtc-sdk-ng-fake";
import { expect } from "vitest";

import { useCurrentUID } from "../../src/hooks/index";
const setUp = (client?: IAgoraRTCClient | null) => renderHook(() => useCurrentUID(client));

describe("useCurrentUID", () => {
  test("returns the client's uid when connected", () => {
    const client = FakeRTCClient.create();
    const { result } = setUp(client);
    expect(result.current).toBe(client.uid);
  });

  test("returns 0 when disConnected", async () => {
    const client = FakeRTCClient.create();
    const { result } = setUp(client);
    act(() => {
      dispatchRTCEvent(client, "connection-state-change", "DISCONNECTED");
    });
    await waitFor(() => {
      expect(result.current).toBe(void 0);
    });
  });

  test("returns uid when CONNECTED", async () => {
    const client = FakeRTCClient.create();
    (client.uid as IAgoraRTCClient["uid"]) = 33;
    (client.connectionState as IAgoraRTCClient["connectionState"]) = "CONNECTED";
    const { result } = setUp(client);
    await waitFor(() => {
      expect(result.current).toBe(33);
    });
  });
});
