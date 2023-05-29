import { renderHook, waitFor } from "@testing-library/react";
import type { ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import { FakeLocalAudioTrack } from "fake-agora-rtc";
import { act } from "react-dom/test-utils";
import { expect, vi } from "vitest";

import { useVolumeLevel } from "../../src/hooks/index";
const setUp = (audioTrack?: IRemoteAudioTrack | ILocalAudioTrack) =>
  renderHook(() => useVolumeLevel(audioTrack));

describe("useVolumeLevel", () => {
  test("should return volumeLevel by getVolumeLevel", async () => {
    const audioTrack = FakeLocalAudioTrack.create();
    audioTrack.getVolumeLevel = vi.fn().mockReturnValue(1);
    vi.useFakeTimers();
    const { result } = setUp(audioTrack);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    waitFor(() => {
      expect(audioTrack.getVolumeLevel).toHaveBeenCalled();
      expect(audioTrack.getVolumeLevel).toHaveBeenCalledWith(1);
      expect(result.current).toEqual(1);
    });
  });
});
