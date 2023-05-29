import { renderHook, waitFor } from "@testing-library/react";
import type { ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import { FakeLocalAudioTrack } from "fake-agora-rtc";
import { expect } from "vitest";

import { useVolumeLevel } from "../../src/hooks/index";
const setUp = (audioTrack?: IRemoteAudioTrack | ILocalAudioTrack) =>
  renderHook(() => useVolumeLevel(audioTrack));

describe("useVolumeLevel", () => {
  test("should return volumeLevel by getVolumeLevel", async () => {
    const audioTrack = FakeLocalAudioTrack.create();
    const { result } = setUp(audioTrack);
    waitFor(() => {
      expect(result.current).toEqual(audioTrack.getVolumeLevel());
    });
  });
});
