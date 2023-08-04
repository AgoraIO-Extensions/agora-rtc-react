import type { ILocalVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps } from "react";
import { useEffect, useState } from "react";

import { VideoTrackStyle, useMergedStyle } from "../assets/styles";
import { useAwaited } from "../hooks/tools";
import type { MaybePromiseOrNull } from "../misc/utils";

import { useAutoPlayVideoTrack } from "./TrackBoundary";

export interface LocalVideoTrackProps extends HTMLProps<HTMLDivElement> {
  /**
   * The local video track to be played. Call [`IAgoraRTC.createScreenVideoTrack`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/functions/useLocalCameraTrack.html">`useLocalCameraTrack`</a> or the Web SDK's <a href="https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createscreenvideotrack) method to create a local video track.
   */
  readonly track?: MaybePromiseOrNull<ILocalVideoTrack>;

  /**
   * `true`: Play the track.`false`: Stop playing the track.
   */
  readonly play?: boolean;

  /**
   * `true`: Disable the track. When disabled, the SDK will stop playing and publishing the track.`false`: Enable the track.
   */
  readonly disabled?: boolean;

  /**
   * `true`: Pause sending media data of the track.`false`: Resume sending media data of the track.
   */
  readonly muted?: boolean;
}

/**
 * This component plays the local video track using the playback device selected by the user in the browser.
 * @example
 * ```jsx
 * import { LocalVideoTrack, useLocalCameraTrack } from "agora-rtc-react";
 *
 * function App() {
 *   const videoTrack = useLocalCameraTrack();
 *   return <LocalVideoTrack track={videoTrack} play />;
 * }
 * ```
 */
export function LocalVideoTrack({
  track: maybeTrack,
  play,
  disabled,
  muted,
  style,
  ...props
}: LocalVideoTrackProps) {
  const mergedStyle = useMergedStyle(VideoTrackStyle, style);
  const [div, setDiv] = useState<HTMLDivElement | null>(null);

  const track = useAwaited(maybeTrack);

  useAutoPlayVideoTrack(track, play, div);

  useEffect(() => {
    if (track && disabled != null) {
      track.setEnabled(!disabled).catch(console.warn);
    }
  }, [disabled, track]);

  useEffect(() => {
    if (track && muted != null) {
      track.setMuted(muted).catch(console.warn);
    }
  }, [muted, track]);

  return <div {...props} ref={setDiv} style={mergedStyle} />;
}
