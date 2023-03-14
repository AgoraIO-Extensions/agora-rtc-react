import type { ILocalVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps } from "react";
import type { MaybePromiseOrNull } from "../utils";

import { forwardRef, useEffect } from "react";
import { useAwaited, useForwardRef } from "../hooks";
import { useReleaseTrackOnUmount } from "../hooks/internal";

export interface LocalVideoTrackProps extends HTMLProps<HTMLDivElement> {
  /**
   * A local video track which can be created by `createCameraVideoTrack()` or `createScreenVideoTrack()`.
   */
  readonly track?: MaybePromiseOrNull<ILocalVideoTrack>;
  /**
   * Whether to play the track.
   */
  readonly play?: boolean;
  readonly publish?: boolean;
}

export const LocalVideoTrack = /* @__PURE__ */ forwardRef<HTMLDivElement, LocalVideoTrackProps>(
  function LocalVideoTrack({ track: maybeTrack, play, publish, ...props }, ref) {
    const [div, setDiv] = useForwardRef(ref);

    const track = useAwaited(maybeTrack);
    useReleaseTrackOnUmount(track);

    useEffect(() => {
      if (div && track && play) {
        track.play(div);
      } else if (track && !play) {
        track.stop();
      }
    }, [div, play, track]);

    useEffect(() => {
      console.log("TODO: publish", { track, publish });
    }, [publish, track]);

    return <div ref={setDiv} {...props} />;
  },
);
