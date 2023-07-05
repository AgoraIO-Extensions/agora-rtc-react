import type { IAgoraRTCError } from "agora-rtc-sdk-ng";

type printType = "log" | "warn" | "error" | "info";

interface IAgoraRTCReactError extends Error {
  readonly rtcMethod: string;
  readonly rtcError: IAgoraRTCError | string;
  log: (type: printType) => void;
}

export class AgoraRTCReactError extends Error implements IAgoraRTCReactError {
  public readonly rtcMethod: string;
  public readonly rtcError: IAgoraRTCError | string;
  public override readonly name: string = "AgoraRTCReactException";

  public constructor(rtcMethod: string, rtcError: IAgoraRTCError | string) {
    if (typeof rtcError === "string") {
      super(rtcError);
    } else {
      super(rtcError.message);
    }
    this.rtcMethod = rtcMethod;
    this.rtcError = rtcError;
  }

  public log(type: printType) {
    console[type](this);
  }
}
