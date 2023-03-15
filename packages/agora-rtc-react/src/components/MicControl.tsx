import "./UserControl.css";

import type { ButtonHTMLAttributes, MouseEvent } from "react";

import { useCallback } from "react";
import { SVGMicrophone } from "./icons/SVGMicrophone";
import { SVGMicrophoneMute } from "./icons/SVGMicrophoneMute";
import { useVolumeLevel } from "../hooks";

export interface MicControlProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  uid?: string | number;
  micOn: boolean;
  onMicChange: (micOn: boolean) => void;
  /** 0~1 */
  noise?: number;
}

export function MicControl({
  noise,
  uid,
  micOn,
  onMicChange,
  onClick,
  className = "",
  ...props
}: MicControlProps) {
  const volumeLevel = useVolumeLevel(uid);

  const handleClick = useCallback(
    (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      onMicChange(!micOn);
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
