import type { ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { interval } from "../misc/utils";

/**
 * 用于自动获取音频轨道音量级别，自动获取的频率为每秒一次。
 *
 * @param `audioTrack` {IRemoteAudioTrack | ILocalAudioTrack | undefined} 本地或远端音频轨道，其中本地音频轨道通过 [useLocalMicrophoneTrack](#uselocalmicrophonetrack) 创建。如果未定义，则音量级别为 0。
 * @return number 音频轨道的音量级别。取值范围 [0, 1]，1 代表理论最大音量。通常该值大于 0.6 代表用户在持续说话。
 */
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
