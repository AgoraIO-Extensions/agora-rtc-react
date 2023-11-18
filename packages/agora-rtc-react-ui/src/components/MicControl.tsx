import "../assets/UserControl.css";

import type { ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-react";
import { useVolumeLevel } from "agora-rtc-react";
import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { useCallback } from "react";

import { SVGMicrophone } from "./icons/SVGMicrophone";
import { SVGMicrophoneMute } from "./icons/SVGMicrophoneMute";

export interface MicControlProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Audio track to subscribe volume level.
   */
  audioTrack?: ILocalAudioTrack | IRemoteAudioTrack;
  /**
   * Microphone is on.
   */
  micOn?: boolean;
  /**
   * Callback when microphone is on/off.
   */
  onMicChange?: (micOn: boolean) => void;
  /**
   * Add noise to volume level for a more organic effect.
   */
  noise?: number;
}

/**
 * A button with microphone icon.
 * Display realtime volume level when `audioTrack` is provided.
 */
export function MicControl({
  noise,
  audioTrack,
  micOn,
  onMicChange,
  onClick,
  className = "",
  ...props
}: MicControlProps) {
  const volumeLevel = useVolumeLevel(audioTrack);

  const handleClick = useCallback(
    (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      onMicChange?.(!micOn);
      onClick?.(evt);
    },
    [onMicChange, onClick, micOn],
  );

  return (
    <button {...props} className={`arr-user-control ${className}`} onClick={handleClick}>
      {micOn ? <SVGMicrophone noise={noise} volumeLevel={volumeLevel} /> : <SVGMicrophoneMute />}
    </button>
  );
}
