import type { ICameraVideoTrack } from "agora-rtc-sdk-ng";
import type { MaybePromiseOrNull } from "../utils";
import type { LocalVideoTrackProps } from "./LocalVideoTrack";

import { forwardRef, useEffect } from "react";
import { useAwaited } from "../utils";
import { LocalVideoTrack } from "./LocalVideoTrack";

export interface CameraVideoTrackProps extends LocalVideoTrackProps {
  readonly track?: MaybePromiseOrNull<ICameraVideoTrack>;
  readonly deviceId?: string;
}

export const CameraVideoTrack = forwardRef<HTMLDivElement, CameraVideoTrackProps>(
  function CameraVideoTrack({ track, deviceId, ...props }, ref) {
    const trackData = useAwaited(track);

    useEffect(() => {
      if (trackData && deviceId) {
        trackData.setDevice(deviceId);
      }
    }, [deviceId, trackData]);

    return <LocalVideoTrack track={track} {...props} ref={ref} />;
  },
);
