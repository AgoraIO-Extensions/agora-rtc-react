import { renderHook, waitFor } from "@testing-library/react";
import type { IAgoraRTCClient, ILocalVideoTrack, UID } from "agora-rtc-sdk-ng";
import type { Mock } from "vitest";
import { expect, vi } from "vitest";

import { useAutoJoin, useRTCClient } from "../../src/hooks/index";
const setUp = (
  appid: string,
  channel: string,
  token: string | null,
  uid?: UID | null,
  client?: IAgoraRTCClient | null,
) => renderHook(() => useAutoJoin(appid, channel, token, uid, client));

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

describe("useAutoJoin", () => {
  test("join result", async () => {
    mockUseRTCClient.mockReturnValueOnce(mockRTCClient);
    const { unmount } = setUp("test", "test", "test", 1, mockRTCClient);
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
