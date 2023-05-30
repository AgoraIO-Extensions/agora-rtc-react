import { renderHook, waitFor } from "@testing-library/react";
import type { IAgoraRTCClient, ILocalVideoTrack } from "agora-rtc-sdk-ng";
import type { Mock } from "vitest";
import { expect, vi } from "vitest";

import type { FetchArgs } from "../../src/hooks/index";
import { useJoin, useRTCClient } from "../../src/hooks/index";
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
    setUp({ appid: "", token: "", channel: "", uid: "" }, false, mockRTCClient);
    await waitFor(() => {
      expect(mockRTCClient.join).toBeCalledTimes(0);
    });
  });
  test("fetchArgs is function and ready is true", async () => {
    mockUseRTCClient.mockReturnValueOnce(mockRTCClient);
    const { unmount } = setUp({ appid: "", token: "", channel: "", uid: "" }, true, mockRTCClient);
    await waitFor(() => {
      expect(mockRTCClient.join).toBeCalled();
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
  });
});
