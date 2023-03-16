import type { ITrack } from "agora-rtc-sdk-ng";
import type { Nullable } from "../utils";

import { useEffect } from "react";

/**
 * Release local or remote track when the component unmounts.
 */
export function useStopTrackOnUmount(track: Nullable<ITrack>) {
  useEffect(() => {
    if (track) {
      return () => track.stop();
    }
  }, [track]);
}
