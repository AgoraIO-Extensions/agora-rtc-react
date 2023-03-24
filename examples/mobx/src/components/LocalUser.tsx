import type { MyLocalUser } from "../stores/local-user.store";
import { LocalMicrophoneAndCameraUser, MicControl } from "agora-rtc-react";
import { observer } from "mobx-react-lite";

interface LocalUserProps {
  className?: string;
  localUser: MyLocalUser;
}

export const LocalUser = observer(function LocalUser({ className, localUser }: LocalUserProps) {
  return (
    <LocalMicrophoneAndCameraUser
      className={className}
      micDisabled={!localUser.micOn}
      audioTrack={localUser.micTrack}
      cameraDisabled={!localUser.cameraOn}
      videoTrack={localUser.cameraTrack}
      playVideo={localUser.cameraOn}
      cover={localUser.avatar}
    >
      <span className="user-name">{localUser.name}</span>
      {localUser.micOn && <MicControl micOn={localUser.micOn} audioTrack={localUser.micTrack} />}
    </LocalMicrophoneAndCameraUser>
  );
});
