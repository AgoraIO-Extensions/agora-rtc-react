import type { IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import type { CSSProperties, HTMLProps } from "react";
import type { Nullable } from "../utils";

import { forwardRef, useEffect } from "react";
import { useReleaseTrackOnUmount } from "../hooks";
import { useForwardRef, useMergedStyle } from "../utils";

export interface RemoteVideoTrackProps extends HTMLProps<HTMLDivElement> {
  readonly track?: Nullable<IRemoteVideoTrack>;
  readonly play?: boolean;
  readonly publish?: boolean;
  readonly width?: CSSProperties["width"];
  readonly height?: CSSProperties["height"];
}

export const RemoteVideoTrack = /* @__PURE__ */ forwardRef<HTMLDivElement, RemoteVideoTrackProps>(
  function RemoteVideoTrack({ track, play, width, height, style, ...props }, ref) {
    const [div, setDiv] = useForwardRef(ref);
    const mergedStyle = useMergedStyle(style, width, height);

    useReleaseTrackOnUmount(track);

    useEffect(() => {
      if (div && track && play) {
        track.play(div);
      } else if (track && !play) {
        track.stop();
      }
    }, [div, play, track]);

    return <div ref={setDiv} style={mergedStyle} {...props} />;
  },
);
