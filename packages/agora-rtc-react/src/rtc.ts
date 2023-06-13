import AgoraRTC from "agora-rtc-sdk-ng";

class AgoraRTCReact {
  readonly appType = 1001;

  public constructor() {
    AgoraRTC.setAppType(this.appType);
  }
}

const instance = new AgoraRTCReact();

export { instance as AgoraRTCReact };
