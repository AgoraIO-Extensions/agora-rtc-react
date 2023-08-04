import type { ILocalAudioTrack } from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { useAwaited } from "../hooks/tools";
import type { MaybePromiseOrNull } from "../misc/utils";

import { useAutoPlayAudioTrack } from "./TrackBoundary";

export interface LocalAudioTrackProps {
  /**
   * The local audio track to be played. Call [`useLocalMicrophoneTrack`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/functions/useLocalMicrophoneTrack.html) to create a local audio track.
   */
  readonly track?: MaybePromiseOrNull<ILocalAudioTrack>;

  /**
   * `true`: Play the track.`false`: Stop playing the track.
   */
  readonly play?: boolean;

  /**
   * The volume. The value ranges from 0 (mute) to 1000 (maximum). A value of 100 is the original volume. When set to above 100, the SDK applies volume amplification using the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).
   */
  readonly volume?: number;

  /**
   * `true`: Disable the track. When disabled, the SDK stops playing and publishing the track.`false`: Enable the track.
   */
  readonly disabled?: boolean;

  /**
   * `true`: Pause sending media data of the track.`false`: Resume sending media data of the track.
   */
  readonly muted?: boolean;

  /**
   * The React nodes to be rendered.
   */
  readonly children?: ReactNode;
}

/**
 * This component plays the local audio track using the playback device selected by the user in the browser.
 * @example
 * ```jsx
 * import { LocalAudioTrack, useLocalAudioTrack } from "agora-rtc-react";
 *
 * function App() {
 *   const audioTrack = useLocalAudioTrack();
 *   return <LocalAudioTrack track={audioTrack} play />;
 * }
 * ```
 */
export function LocalAudioTrack({
  track: maybeTrack,
  play = false,
  volume,
  disabled,
  muted,
  children,
}: LocalAudioTrackProps) {
  const track = useAwaited(maybeTrack);

  useAutoPlayAudioTrack(track, play);

  useEffect(() => {
    if (track && volume != null) {
      track.setVolume(volume);
    }
  }, [track, volume]);

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

  return children ? <>{children}</> : null;
}
