import type { ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { interval } from "../misc/utils";

export function useVolumeLevel(audioTrack?: IRemoteAudioTrack | ILocalAudioTrack): number {
  const [volumeLevel, setVolumeLevel] = useState(0);

  useEffect(() => {
    if (audioTrack) {
      return interval(() => {
        setVolumeLevel(audioTrack.getVolumeLevel());
      }, 1000);
    }
  }, [audioTrack]);

  return volumeLevel;
}
