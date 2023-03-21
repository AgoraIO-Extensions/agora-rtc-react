import { createFakeAgoraRTC } from "./top";
import { FakeCameraVideoTrack, FakeMicrophoneAudioTrack } from "./tracks";

export * from "./tracks";
export * from "./eventemitter";
export * from "./client";

export default createFakeAgoraRTC({
  createMicrophoneAudioTrack: async () => FakeMicrophoneAudioTrack.create(),
  createCameraVideoTrack: async () => FakeCameraVideoTrack.create(),
});
