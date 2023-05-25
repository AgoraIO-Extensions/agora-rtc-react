import { renderHook } from "@testing-library/react";
import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { FakeRTCClient } from "fake-agora-rtc";
import { expect } from "vitest";

import { useIsConnected } from "../../src/hooks/index";
const setUp = (client?: IAgoraRTCClient | null) => renderHook(() => useIsConnected(client));

describe("useIsConnected", () => {
  test("returns false when client is not connected", () => {
    const client = FakeRTCClient.create();
    (client.connectionState as IAgoraRTCClient["connectionState"]) = "DISCONNECTED";
    const { result } = setUp(client);
    expect(result.current).toBe(false);
  });

  test("returns true when client is connected", () => {
    const client = FakeRTCClient.create();
    (client.connectionState as IAgoraRTCClient["connectionState"]) = "CONNECTED";
    const { result } = setUp(client);
    expect(result.current).toBe(true);
  });
});
