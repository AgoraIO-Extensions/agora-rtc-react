import type { AgoraRTCError } from "./listen";

type printType = "log" | "warn" | "error" | "info";

interface IAgoraRTCReactError extends Error {
  readonly rtcMethod: string;
  readonly rtcError: AgoraRTCError | string;
  log: (type: printType) => void;
}

export class AgoraRTCReactError extends Error implements IAgoraRTCReactError {
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

  public log(type: printType) {
    console[type](this);
  }
}
