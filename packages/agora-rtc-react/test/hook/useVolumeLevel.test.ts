import { renderHook, waitFor } from "@testing-library/react";
import type { ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import { FakeLocalAudioTrack } from "agora-rtc-sdk-ng-fake";
import { act } from "react-dom/test-utils";
import { expect, vi } from "vitest";

import { useVolumeLevel } from "../../src/hooks/index";
const setUp = (audioTrack?: IRemoteAudioTrack | ILocalAudioTrack) =>
  renderHook(() => useVolumeLevel(audioTrack));

describe("useVolumeLevel", () => {
  test("should return volumeLevel by getVolumeLevel", async () => {
    const audioTrack = FakeLocalAudioTrack.create();
    vi.spyOn(audioTrack, "getVolumeLevel");
    vi.useFakeTimers();
    const { result } = setUp(audioTrack);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    await waitFor(() => {
      expect(audioTrack.getVolumeLevel).toHaveBeenCalled();
      expect(result.current).toEqual(audioTrack.getVolumeLevel());
    });
    jest.useRealTimers();
  });
});
