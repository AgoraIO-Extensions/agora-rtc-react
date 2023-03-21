import type { IAgoraRTC } from "agora-rtc-sdk-ng";

export function createFakeAgoraRTC(
  executor?: Partial<IAgoraRTC> | (() => Partial<IAgoraRTC>),
): IAgoraRTC {
  const partialRTC = typeof executor === "function" ? executor() : executor;
  return partialRTC as unknown as IAgoraRTC;
}
