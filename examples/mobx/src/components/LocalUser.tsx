import type { MyLocalUser } from "../stores/local-user.store";
import { observer } from "mobx-react-lite";
import { LocalMicrophoneAndCameraUser } from "agora-rtc-react";
import { MicControl } from "agora-rtc-react-ui";

interface LocalUserProps {
  className?: string;
  localUser: MyLocalUser;
}

export const LocalUser = observer(function LocalUser({ className, localUser }: LocalUserProps) {
  return (
    <div className={className}>
      <LocalMicrophoneAndCameraUser
        micOn={localUser.micOn}
        audioTrack={localUser.micTrack}
        cameraOn={localUser.cameraOn}
        videoTrack={localUser.cameraTrack}
        playVideo={localUser.cameraOn}
        cover={localUser.avatar}
      >
        <span className="user-name">{localUser.name}</span>
        {localUser.micOn && <MicControl micOn disabled audioTrack={localUser.micTrack} />}
      </LocalMicrophoneAndCameraUser>
    </div>
  );
});
