import { act, renderHook } from "@testing-library/react";
import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { FakeRTCClient, dispatchRTCEvent } from "agora-rtc-sdk-ng-fake";
import { expect, test } from "vitest";

import { useConnectionState } from "../../src/hooks/index";

const setUp = (client?: IAgoraRTCClient | null) => renderHook(() => useConnectionState(client));

describe("useConnectionState", () => {
  test("should return client connection state", () => {
    const client = FakeRTCClient.create();
    const { result } = setUp(client);
    expect(result.current).toBe(client.connectionState);
  });

  test("should update state on connection-state-change event", () => {
    const client = FakeRTCClient.create();
    const { result } = setUp(client);
    expect(result.current).toBe(client.connectionState);
    act(() => {
      dispatchRTCEvent(client, "connection-state-change", "CONNECTING");
    });
    expect(result.current).toBe("CONNECTING");
  });
});
