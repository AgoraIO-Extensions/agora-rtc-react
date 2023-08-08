import AgoraRTC from "agora-rtc-sdk-ng";

interface IAgoraRTCReact {
  readonly appType: number;
}

class AgoraRTCReact implements IAgoraRTCReact {
  readonly appType = 1001;

  public constructor() {
    AgoraRTC.setAppType(this.appType);
  }
}

new AgoraRTCReact();

export const VERSION = "2.0.0-beta.0";
