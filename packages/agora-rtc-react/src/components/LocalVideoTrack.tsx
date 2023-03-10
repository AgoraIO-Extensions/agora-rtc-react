import type { ILocalVideoTrack } from "agora-rtc-sdk-ng";
import type { CSSProperties, HTMLProps } from "react";
import type { MaybePromiseOrNull } from "../utils";

import { forwardRef, useEffect } from "react";
import { useReleaseTrackOnUmount } from "../hooks";
import { useAwaited, useForwardRef, useMergedStyle } from "../utils";

export interface LocalVideoTrackProps extends HTMLProps<HTMLDivElement> {
  readonly track?: MaybePromiseOrNull<ILocalVideoTrack>;
  readonly play?: boolean;
  readonly publish?: boolean;
  readonly width?: CSSProperties["width"];
  readonly height?: CSSProperties["height"];
}

export const LocalVideoTrack = /* @__PURE__ */ forwardRef<HTMLDivElement, LocalVideoTrackProps>(
  function LocalVideoTrack({ track, play, publish, width, height, style, ...props }, ref) {
    const [div, setDiv] = useForwardRef(ref);
    const mergedStyle = useMergedStyle(style, width, height);

    const trackData = useAwaited(track);
    useReleaseTrackOnUmount(trackData);

    useEffect(() => {
      if (div && trackData && play) {
        trackData.play(div);
      } else if (trackData && !play) {
        trackData.stop();
      }
    }, [div, play, trackData]);

    useEffect(() => {
      console.log("TODO: publish", { trackData, publish });
    }, [publish, trackData]);

    return <div ref={setDiv} style={mergedStyle} {...props} />;
  },
);
