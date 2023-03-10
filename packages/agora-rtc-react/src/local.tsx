import type { ILocalAudioTrack, ILocalVideoTrack } from "agora-rtc-sdk-ng";
import type { CSSProperties, HTMLProps } from "react";
import type { MaybePromiseOrNull } from "./utils";

import { forwardRef, useEffect, useState } from "react";
import { useCloseLocalTrackOnUnmount, useTrackEvent } from "./hooks";
import { useAwaited, useMergedRef, useMergedStyle } from "./utils";

export interface LocalAudioTrackProps {
  readonly track?: MaybePromiseOrNull<ILocalAudioTrack>;
  readonly play?: boolean;
  readonly publish?: boolean;
  readonly onTrackEnded?: () => void;
}

export function LocalAudioTrack({ track, play, publish, onTrackEnded }: LocalAudioTrackProps) {
  const trackData = useAwaited(track);
  useCloseLocalTrackOnUnmount(trackData);

  useEffect(() => {
    if (trackData && play) {
      trackData.play();
    } else if (trackData && !play) {
      trackData.stop();
    }
  }, [play, trackData]);

  useTrackEvent(trackData, "track-ended", onTrackEnded);

  useEffect(() => {
    console.log("TODO: publish", { trackData, publish });
  }, [publish, trackData]);

  return null;
}

export interface LocalVideoTrackProps extends HTMLProps<HTMLDivElement> {
  readonly track?: MaybePromiseOrNull<ILocalVideoTrack>;
  readonly play?: boolean;
  readonly publish?: boolean;
  readonly width?: CSSProperties["width"];
  readonly height?: CSSProperties["height"];
  readonly onBeautyEffectOverload?: () => void;
  readonly onTrackEnded?: () => void;
  readonly onVideoElementVisibleStatus?: () => void;
}

export const LocalVideoTrack = /* @__PURE__ */ forwardRef<HTMLDivElement, LocalVideoTrackProps>(
  function LocalVideoTrack(
    {
      track,
      play,
      publish,
      width,
      height,
      style,
      onBeautyEffectOverload,
      onTrackEnded,
      onVideoElementVisibleStatus,
      ...props
    },
    ref,
  ) {
    const [div, setDiv] = useState<HTMLDivElement | null>(null);

    const mergedRef = useMergedRef(ref, setDiv);
    const mergedStyle = useMergedStyle(style, width, height);

    const trackData = useAwaited(track);
    useCloseLocalTrackOnUnmount(trackData);

    useEffect(() => {
      if (div && trackData && play) {
        trackData.play(div);
      } else if (trackData && !play) {
        trackData.stop();
      }
    }, [div, play, trackData]);

    useTrackEvent(trackData, "beauty-effect-overload", onBeautyEffectOverload);
    useTrackEvent(trackData, "track-ended", onTrackEnded);
    useTrackEvent(trackData, "video-element-visible-status", onVideoElementVisibleStatus);

    useEffect(() => {
      console.log("TODO: publish", { trackData, publish });
    }, [publish, trackData]);

    return <div ref={mergedRef} style={mergedStyle} {...props} />;
  },
);
