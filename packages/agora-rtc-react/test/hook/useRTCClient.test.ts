import { renderHook } from "@testing-library/react";
import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { FakeRTCClient } from "agora-rtc-sdk-ng-fake";
import { expect } from "vitest";

import { useRTCClient } from "../../src/hooks/index";
const setUp = (client?: IAgoraRTCClient | null) => renderHook(() => useRTCClient(client));

describe("useRTCClient", () => {
  test("should throw an error if no client is provided", () => {
    expect(() => setUp(null)).toThrow(/^Agora RTC client not found/);
  });

  test("should return the provided client", () => {
    const client = FakeRTCClient.create();
    const { result } = setUp(client);
    expect(result.current).toBe(client);
  });
});
