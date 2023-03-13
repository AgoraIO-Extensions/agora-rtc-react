import type { IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps } from "react";
import type { Nullable } from "../utils";

import { forwardRef, useEffect } from "react";
import { useReleaseTrackOnUmount } from "../hooks";
import { useForwardRef } from "../utils";

export interface RemoteVideoTrackProps extends HTMLProps<HTMLDivElement> {
  /**
   * A remote video track.
   */
  readonly track?: Nullable<IRemoteVideoTrack>;
  /**
   * Whether to play the track.
   */
  readonly play?: boolean;
}

export const RemoteVideoTrack = /* @__PURE__ */ forwardRef<HTMLDivElement, RemoteVideoTrackProps>(
  function RemoteVideoTrack({ track, play, ...props }, ref) {
    const [div, setDiv] = useForwardRef(ref);

    useReleaseTrackOnUmount(track);

    useEffect(() => {
      if (div && track && play) {
        track.play(div);
      } else if (track && !play) {
        track.stop();
      }
    }, [div, play, track]);

    return <div ref={setDiv} {...props} />;
  },
);
