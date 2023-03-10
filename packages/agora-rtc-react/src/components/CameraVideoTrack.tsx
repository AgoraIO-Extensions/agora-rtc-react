import type { ICameraVideoTrack } from "agora-rtc-sdk-ng";
import type { MaybePromiseOrNull } from "../utils";
import type { LocalVideoTrackProps } from "./LocalVideoTrack";

import { forwardRef, useEffect } from "react";
import { useAwaited } from "../utils";
import { LocalVideoTrack } from "./LocalVideoTrack";

export interface CameraVideoTrackProps extends LocalVideoTrackProps {
  /**
   * A camera video track which can be created by `createCameraVideoTrack()`.
   */
  readonly track?: MaybePromiseOrNull<ICameraVideoTrack>;
  /**
   * Device ID, which can be retrieved by calling `getDevices()`.
   */
  readonly deviceId?: string;
  /**
   * Enable or disable the track.
   *
   * If a track is disabled, the SDK stops playing and publishing the track.
   */
  readonly enabled?: boolean;
}

export const CameraVideoTrack = /* @__PURE__ */ forwardRef<HTMLDivElement, CameraVideoTrackProps>(
  function CameraVideoTrack({ track: maybeTrack, deviceId, enabled, ...props }, ref) {
    const track = useAwaited(maybeTrack);

    useEffect(() => {
      if (track && deviceId != null) {
        track.setDevice(deviceId).catch(console.warn);
      }
    }, [deviceId, track]);

    useEffect(() => {
      if (track && enabled != null) {
        track.setEnabled(enabled).catch(console.warn);
      }
    }, [enabled, track]);

    return <LocalVideoTrack track={maybeTrack} {...props} ref={ref} />;
  },
);
