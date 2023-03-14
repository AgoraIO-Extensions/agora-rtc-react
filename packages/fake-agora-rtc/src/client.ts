import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { FakeAgoraEventEmitter } from "./eventemitter";

export function createFakeRtcClient(
  executor?: Partial<IAgoraRTCClient> | (() => Partial<IAgoraRTCClient>),
): IAgoraRTCClient {
  const partialClient = typeof executor === "function" ? executor() : executor;
  return Object.assign(new FakeAgoraEventEmitter(), partialClient) as unknown as IAgoraRTCClient;
}
