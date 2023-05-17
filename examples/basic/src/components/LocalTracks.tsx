import { CameraVideoTrack, MicrophoneAudioTrack } from "agora-rtc-react";
import type { ICameraVideoTrack, IMicrophoneAudioTrack, UID } from "agora-rtc-sdk-ng";

export interface LocalTracksProps {
  uid: UID;
  micOn: boolean;
  cameraOn: boolean;
  audioTrack?: IMicrophoneAudioTrack | null;
  videoTrack?: ICameraVideoTrack | null;
}

export const LocalTracks = ({ micOn, audioTrack, cameraOn, videoTrack, uid }: LocalTracksProps) => (
  <div className="local b-1 b-solid b-coolgray-6 rd of-hidden relative">
    {micOn && <MicrophoneAudioTrack track={audioTrack} />}
    {cameraOn && <CameraVideoTrack className="h-full" play track={videoTrack} />}
    <div className="label inline-flex items-center gap-1 absolute bottom-0 bg-black c-white p-x-2">
      <span>{uid}</span>
      {micOn && <i className="i-mdi-volume" />}
    </div>
  </div>
);
