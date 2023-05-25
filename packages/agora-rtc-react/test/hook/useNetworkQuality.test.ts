import { act, renderHook } from "@testing-library/react";
import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { FakeRTCClient, dispatchRTCEvent } from "fake-agora-rtc";
import { expect, vi } from "vitest";

import { useNetworkQuality } from "../../src/hooks/index";
const setUp = (client?: IAgoraRTCClient | null) => renderHook(() => useNetworkQuality(client));

describe("useNetworkQuality", () => {
  test("default value", () => {
    const initQuality = () => ({
      uplink: 0,
      downlink: 0,
      delay: 0,
    });

    const client = FakeRTCClient.create();
    const { result } = setUp(client);
    expect(result.current).toStrictEqual(initQuality());
    client.getRTCStats = vi.fn().mockReturnValue({ RTT: 3 });
    const newQuality = {
      uplinkNetworkQuality: 1,
      downlinkNetworkQuality: 2,
    };

    act(() => {
      dispatchRTCEvent(client, "network-quality", newQuality);
    });
    expect(result.current).toStrictEqual({ uplink: 1, downlink: 2, delay: 3 });
  });
});
