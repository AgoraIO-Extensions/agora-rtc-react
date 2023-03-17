import "./UserControl.css";

import type { ButtonHTMLAttributes, MouseEvent } from "react";
import type { ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";

import { useCallback } from "react";
import { SVGMicrophone } from "./icons/SVGMicrophone";
import { SVGMicrophoneMute } from "./icons/SVGMicrophoneMute";
import { useVolumeLevel } from "../hooks";

export interface MicControlProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  audioTrack?: ILocalAudioTrack | IRemoteAudioTrack;
  micOn?: boolean;
  onMicChange?: (micOn: boolean) => void;
  /** 0~1 */
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
      {micOn ? <SVGMicrophone volumeLevel={volumeLevel} noise={noise} /> : <SVGMicrophoneMute />}
    </button>
  );
}
