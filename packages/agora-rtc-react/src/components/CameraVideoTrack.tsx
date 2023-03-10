import type { ICameraVideoTrack } from "agora-rtc-sdk-ng";
import type { MaybePromiseOrNull } from "../utils";
import type { LocalVideoTrackProps } from "./LocalVideoTrack";

import { forwardRef, useEffect } from "react";
import { useAwaited } from "../utils";
import { LocalVideoTrack } from "./LocalVideoTrack";

export interface CameraVideoTrackProps extends LocalVideoTrackProps {
  readonly track?: MaybePromiseOrNull<ICameraVideoTrack>;
  readonly deviceId?: string;
  readonly enabled?: boolean;
}

export const CameraVideoTrack = /* @__PURE__ */ forwardRef<HTMLDivElement, CameraVideoTrackProps>(
  function CameraVideoTrack({ track, deviceId, enabled, ...props }, ref) {
    const trackData = useAwaited(track);

    useEffect(() => {
      if (trackData && deviceId != null) {
        trackData.setDevice(deviceId).catch(console.error);
      }
    }, [deviceId, trackData]);

    useEffect(() => {
      if (trackData && enabled != null) {
        trackData.setEnabled(enabled).catch(console.error);
      }
    }, [enabled, trackData]);

    return <LocalVideoTrack track={track} {...props} ref={ref} />;
  },
);
