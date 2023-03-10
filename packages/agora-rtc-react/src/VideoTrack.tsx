import type { ILocalVideoTrack } from "agora-rtc-sdk-ng";
import type { CSSProperties, HTMLProps, Ref } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback, useState } from "react";

import { forwardRef } from "react";
import { useSafePromise } from "./utils";

// 底层

// useTrackEnded(track, props.onTrackEnded)
//   useIsomorphicEffect(() => {
//     track.on("track-ended", ...)
//   }, [onTrackEnded])

// LocalAudioTrack
// Remote...

type PromiseOrValueOrNull<T> = PromiseLike<T | null | undefined> | T | null | undefined;

export interface LocalVideoTrackProps extends HTMLProps<HTMLDivElement> {
  readonly track?: PromiseOrValueOrNull<ILocalVideoTrack>;
  readonly width?: number;
  readonly height?: number;

  // TODO: onTrackEnded: () => void ....
  // TODO: publish?: boolean
}

const forward = forwardRef<HTMLDivElement, LocalVideoTrackProps>;

function applyRef<T>(ref: Ref<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (typeof ref === "object" && ref) {
    (ref as any).current = value;
  }
}

export const LocalVideoTrack = forward(function LocalVideoTrack(
  { track, width, height, style, ...props },
  ref,
) {
  const [div, setDiv] = useState<HTMLDivElement | null>(null);

  const mergedRef = useCallback(
    (div: HTMLDivElement | null) => (applyRef(ref, div), setDiv(div)),
    [ref],
  );

  const mergedStyle = useMemo(() => {
    if (width != null || height != null || style != null) {
      const style_: CSSProperties = { ...style };
      if (width != null) {
        style_.width = width;
      }
      if (height != null) {
        style_.height = height;
      }
      return style_;
    }
  }, [width, height, style]);

  useEffect(() => {
    if (div && track) {
      let isUnmount = false;
      let trackData: ILocalVideoTrack | null | undefined;

      const action = async () => {
        trackData = await track;
        if (trackData && !isUnmount) {
          trackData.play(div);
        }
      };
      action();

      return () => {
        isUnmount = true;
        if (trackData) {
          trackData.stop();
          trackData.close();
        }
      };
    }
  }, [div, track]);

  return <div ref={mergedRef} style={mergedStyle} {...props} />;
});
