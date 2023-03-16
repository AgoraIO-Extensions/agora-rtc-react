import type { ILocalVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps } from "react";
import type { MaybePromiseOrNull } from "../utils";

import { useEffect, useState } from "react";
import { useAwaited } from "../hooks";
import { useStopTrackOnUmount } from "../hooks/internal";

export interface LocalVideoTrackProps extends HTMLProps<HTMLDivElement> {
  /**
   * A local video track which can be created by `createCameraVideoTrack()` or `createScreenVideoTrack()`.
   */
  readonly track?: MaybePromiseOrNull<ILocalVideoTrack>;
  /**
   * Whether to play the track.
   */
  readonly play?: boolean;
}

export function LocalVideoTrack({ track: maybeTrack, play, ...props }: LocalVideoTrackProps) {
  const [div, setDiv] = useState<HTMLDivElement | null>(null);

  const track = useAwaited(maybeTrack);
  useStopTrackOnUmount(track);

  useEffect(() => {
    if (div && track && play) {
      track.play(div);
    } else if (track && !play) {
      track.stop();
    }
  }, [div, play, track]);

  return <div ref={setDiv} {...props} />;
}
