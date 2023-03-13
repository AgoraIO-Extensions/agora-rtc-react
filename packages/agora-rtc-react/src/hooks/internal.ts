import type { ILocalTrack, ITrack } from "agora-rtc-sdk-ng";
import type { Nullable } from "../utils";

import { useEffect } from "react";

/**
 * Release local or remote track when the component unmounts.
 */
export function useReleaseTrackOnUmount(track: Nullable<ITrack>) {
  useEffect(() => {
    if (track) {
      return () => {
        track.stop();
        if ((track as ILocalTrack).close) {
          (track as ILocalTrack).close();
        }
      };
    }
  }, [track]);
}
