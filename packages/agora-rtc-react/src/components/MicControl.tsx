import type { ButtonHTMLAttributes } from "react";

import { useEffect, useState } from "react";
import { useRTCClient } from "../hooks";
import { listen } from "../listen";
import { SVGMicrophone } from "./icons/SVGMicrophone";
import { SVGMicrophoneMute } from "./icons/SVGMicrophoneMute";

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
  className = "",
  ...props
}: MicControlProps) {
  const [volumeLevel, setVolumeLevel] = useState(0);

  const client = useRTCClient(true);

  useEffect(() => {
    if (uid != null && client) {
      return listen(client, "volume-indicator", results => {
        for (const volume of results) {
          if (volume.uid === uid) {
            setVolumeLevel(volume.level);
            break;
          }
        }
      });
    }
  }, [uid, client]);

  return (
    <button {...props} className={`agora-rtc-mic-control ${className}`}>
      {micOn ? <SVGMicrophone volumeLevel={volumeLevel} noise={noise} /> : <SVGMicrophoneMute />}
    </button>
  );
}
