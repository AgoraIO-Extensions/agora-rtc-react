import { renderHook, waitFor } from "@testing-library/react";
import type { IAgoraRTCClient, ILocalVideoTrack } from "agora-rtc-sdk-ng";
import { FakeRTCClient } from "fake-agora-rtc";
import type { Mock } from "vitest";
import { expect, vi } from "vitest";

import * as clientHook from "../../src/hooks/client";
import type { FetchArgs } from "../../src/hooks/index";
import { useJoin, useRTCClient } from "../../src/hooks/index";
import { errorMessage } from "../setup";
const setUp = (fetchArgs: FetchArgs, ready = true, client?: IAgoraRTCClient | null) =>
  renderHook(() => useJoin(fetchArgs, ready, client));

vi.mock("../../src/hooks", async () => {
  const actual: object = await vi.importActual("../../src/hooks");
  return {
    ...actual,
    useRTCClient: vi.fn(),
  };
});

const mockTrack: ILocalVideoTrack = {
  close: vi.fn(),
  stop: vi.fn(),
  isPlaying: false,
} as unknown as ILocalVideoTrack;

const mockRTCClient: IAgoraRTCClient = {
  join: vi.fn().mockReturnValue(Promise.resolve()),
  localTracks: [mockTrack],
  leave: vi.fn().mockReturnValue(Promise.resolve()),
} as unknown as IAgoraRTCClient;

const mockUseRTCClient = useRTCClient as Mock;

describe("useJoin", () => {
  test("ready is false", async () => {
    mockUseRTCClient.mockReturnValueOnce(mockRTCClient);
    const { result } = setUp({ appid: "", token: "", channel: "", uid: "" }, false, mockRTCClient);
    await waitFor(() => {
      expect(mockRTCClient.join).toBeCalledTimes(0);
      expect(result.current.joinComplete).toBe(false);
      expect(result.current.error).toBe(null);
    });
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
  test("fetchArgs is function and ready is true", async () => {
    mockUseRTCClient.mockReturnValueOnce(mockRTCClient);
    const { unmount, result } = setUp(
      { appid: "", token: "", channel: "", uid: "" },
      true,
      mockRTCClient,
    );
    await waitFor(() => {
      expect(mockRTCClient.join).toBeCalled();
      expect(result.current.joinComplete).toBe(true);
      expect(result.current.error).toBe(null);
      expect(result.current.data).not.toBe(0);
    });
    unmount();
    await waitFor(() => {
      expect(mockRTCClient.leave).toBeCalledTimes(1);
      if (mockTrack.isPlaying) {
        expect(mockTrack.stop).toBeCalledTimes(1);
      } else {
        expect(mockTrack.stop).toBeCalledTimes(0);
      }
      expect(mockTrack.close).toBeCalledTimes(1);
    });
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test("return error when join is failed", async () => {
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
    const spy2 = vi.spyOn(client, "join").mockRejectedValue(errorMessage);
    const spy3 = vi.spyOn(console, "error");
    const { result } = setUp({ appid: "", token: "", channel: "", uid: "" }, true, client);
    await waitFor(() => {
      expect(spy2).toBeCalled();
      expect(result.current.joinComplete).toBe(true);
      expect(result.current.error).not.toBeNull();
      expect(result.current.error).not.toBeUndefined();
      expect(result.current.error).toBe(errorMessage);
      expect(spy3).toHaveBeenCalledWith(errorMessage);
      expect(result.current.data).toBe(0);
    });
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
});
