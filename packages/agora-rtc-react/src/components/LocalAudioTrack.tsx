import type { ILocalAudioTrack } from "agora-rtc-sdk-ng";
import type { MaybePromiseOrNull } from "../utils";

import { useEffect } from "react";
import { useReleaseTrackOnUmount } from "../hooks";
import { useAwaited } from "../utils";

export interface LocalAudioTrackProps {
  readonly track?: MaybePromiseOrNull<ILocalAudioTrack>;
  readonly play?: boolean;
  readonly publish?: boolean;
}

export function LocalAudioTrack({ track, play, publish }: LocalAudioTrackProps) {
  const trackData = useAwaited(track);
  useReleaseTrackOnUmount(trackData);

  useEffect(() => {
    if (trackData && play) {
      trackData.play();
    } else if (trackData && !play) {
      trackData.stop();
    }
  }, [play, trackData]);

  useEffect(() => {
    console.log("TODO: publish", { trackData, publish });
  }, [publish, trackData]);

  return null;
}
