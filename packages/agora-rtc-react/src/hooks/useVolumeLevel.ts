import type { ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { interval } from "../misc/utils";

/**
 * Returns the volume level of an audio track at a frequency of once per second.
 *
 * @param audioTrack - The local or remote audio track. The local audio track can be created by calling [`useLocalMicrophoneTrack`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/functions/useLocalMicrophoneTrack.html). If undefined, the volume level is 0.
 * @example
 * ```jsx
 * import { useVolumeLevel, useLocalMicrophoneTrack } from "agora-rtc-react";
 *
 * function App() {
 *   const audioTrack = useLocalMicrophoneTrack();
 *   const volumeLevel = useVolumeLevel(audioTrack);
 *
 *   return <div>{volumeLevel}</div>;
 * }
 * ```
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
