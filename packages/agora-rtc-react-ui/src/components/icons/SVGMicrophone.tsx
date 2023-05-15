import type { SVGProps } from "react";
import { useEffect, useState } from "react";

const vHeight = 14;
const vWidth = 8;
const vBaseX = 8;
const vBaseY = 4;

export interface SVGMicrophoneProps extends SVGProps<SVGSVGElement> {
  /** 0~1 */
  volumeLevel?: number;
  /** 0~1 */
  noise?: number;
}

export function SVGMicrophone({
  volumeLevel: baseVolumeLevel = 0,
  noise = 0.075,
  ...props
}: SVGMicrophoneProps) {
  // 0~1
  const [volumeLevel, setVolumeLevel] = useState(0);

  useEffect(() => {
    if (baseVolumeLevel && noise) {
      const safeNoise = Math.max(0, Math.min(1, noise));
      const ticket = setInterval(() => {
        setVolumeLevel(
          baseVolumeLevel + Math.random() * safeNoise * (Math.random() > 0.5 ? 1 : -1),
        );
      }, 50);
      return () => clearInterval(ticket);
    }
  }, [baseVolumeLevel, noise]);

  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <clipPath id="icon-mic-v-clip">
          <rect height={vHeight} rx={vWidth / 2} width={vWidth} x={vBaseX} y={vBaseY} />
        </clipPath>
      </defs>
      <path d="M0 0h24v24H0z" fill="#999CA3" opacity=".01" />
      <rect
        clipPath="url(#icon-mic-v-clip)"
        fill="#fff"
        height={vHeight}
        width={vWidth}
        x={vBaseX}
        y={vBaseY}
      />
      <path
        d="M4 16.625h2v-1.25H4v1.25Zm6 4h4v-1.25h-4v1.25Zm8-4h2v-1.25h-2v1.25Zm-4 4A4.625 4.625 0 0 0 18.625 16h-1.25A3.375 3.375 0 0 1 14 19.375v1.25ZM5.375 16A4.625 4.625 0 0 0 10 20.625v-1.25A3.375 3.375 0 0 1 6.625 16h-1.25Z"
        fill="#fff"
      />
      <g clipPath="url(#icon-mic-v-clip)">
        <rect
          fill="#44AD00"
          height={vHeight * 2}
          style={{
            transform: `translateY(${(1 - volumeLevel) * vHeight}px)`,
            transition: "transform .1s",
          }}
          width={vWidth}
          x={vBaseX}
          y={vBaseY}
        />
      </g>
    </svg>
  );
}
