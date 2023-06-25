import type { AgoraRTCError } from "./listen";

export interface IAgoraRtcReactError extends AgoraRTCError {
  readonly rtcMethod: string;
  readonly rtcError: AgoraRTCError | string;
}

type printType = "log" | "warn" | "error" | "info";

export class AgoraRtcReactError extends Error {
  public readonly rtcMethod: string;
  public readonly rtcError: AgoraRTCError | string;
  public override readonly name: string = "AgoraRTCReactException";

  public constructor(rtcMethod: string, rtcError: AgoraRTCError | string) {
    if (typeof rtcError === "string") {
      super(rtcError);
    } else {
      super(rtcError.message);
    }
    this.rtcMethod = rtcMethod;
    this.rtcError = rtcError;
  }

  public print(type: printType) {
    if (typeof this.rtcError === "string") {
      console[type](this.rtcError);
    } else {
      console[type](this.rtcError.message);
    }
  }
}
