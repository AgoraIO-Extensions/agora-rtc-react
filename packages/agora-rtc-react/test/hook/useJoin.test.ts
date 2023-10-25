import { renderHook, waitFor } from "@testing-library/react";
import type { ILocalTrack, ILocalVideoTrack } from "agora-rtc-sdk-ng";
import { FakeRTCClient } from "agora-rtc-sdk-ng-fake";
import { expect, vi } from "vitest";

import { errorMessage } from "../../../shared/test/setup/agora";
import { createWrapper } from "../../../shared/test/setup/wrapper";
import * as clientHook from "../../src/hooks";
import { useJoin } from "../../src/hooks/useJoin";

const mockTrack: ILocalVideoTrack = {
  close: vi.fn(),
  stop: vi.fn(),
  isPlaying: false,
} as unknown as ILocalVideoTrack;

describe("useJoin", () => {
  test("ready is false", async () => {
    const client = FakeRTCClient.create();
    const spy = vi.spyOn(clientHook, "useIsConnected");
    const spy2 = vi.spyOn(client, "join");
    spy.mockReturnValue(true);
    const { result } = renderHook(
      () => useJoin({ appid: "", token: "", channel: "", uid: "" }, false, client),
      {
        wrapper: createWrapper(client),
      },
    );
    await waitFor(() => {
      expect(spy2).toBeCalledTimes(0);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isConnected).toBe(false);
      expect(result.current.error).toBe(null);
    });
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
  test("fetchArgs is function and ready is true", async () => {
    const client = FakeRTCClient.create();
    (client.localTracks as ILocalTrack[]) = [mockTrack];
    const spy = vi.spyOn(clientHook, "useIsConnected");
    spy.mockReturnValue(true);
    const spy2 = vi.spyOn(client, "join");
    const spy3 = vi.spyOn(client, "leave");
    const { result, unmount } = renderHook(
      () => useJoin({ appid: "", token: "", channel: "", uid: "" }, true, client),
      {
        wrapper: createWrapper(client),
      },
    );
    await waitFor(() => {
      expect(spy2).toBeCalled();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.data).not.toBe(0);
    });
    unmount();
    await waitFor(() => {
      expect(spy3).toBeCalledTimes(1);
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
    const { result } = renderHook(
      () => useJoin({ appid: "", token: "", channel: "", uid: "" }, true, client),
      {
        wrapper: createWrapper(client),
      },
    );
    await waitFor(() => {
      expect(spy2).toBeCalled();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isConnected).toBe(false);
      expect(result.current.error).not.toBeNull();
      expect(result.current.error).not.toBeUndefined();
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.rtcMethod).toBe("IAgoraRTCClient.join");
      expect(spy3).toHaveBeenCalledWith(errorMessage);
      expect(result.current.data).toBe(0);
    });
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
});
