import type { ILocalVideoTrack } from "agora-rtc-sdk-ng";
import type { CSSProperties, HTMLProps } from "react";
import type { MaybePromiseOrNull } from "../utils";

import { forwardRef, useEffect } from "react";
import { useReleaseTrackOnUmount } from "../hooks";
import { useAwaited, useForwardRef, useMergedStyle } from "../utils";

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
  /**
   * Set the style.width of the underlying div element.
   */
  readonly width?: CSSProperties["width"];
  /**
   * Set the style.height of the underlying div element.
   */
  readonly height?: CSSProperties["height"];
}

export const LocalVideoTrack = /* @__PURE__ */ forwardRef<HTMLDivElement, LocalVideoTrackProps>(
  function LocalVideoTrack(
    { track: maybeTrack, play, publish, width, height, style, ...props },
    ref,
  ) {
    const [div, setDiv] = useForwardRef(ref);
    const mergedStyle = useMergedStyle(style, width, height);

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

    return <div ref={setDiv} style={mergedStyle} {...props} />;
  },
);
