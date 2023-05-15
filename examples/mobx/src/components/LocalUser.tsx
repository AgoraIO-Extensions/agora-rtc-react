import { LocalMicrophoneAndCameraUser } from "agora-rtc-react";
import { MicControl } from "agora-rtc-react-ui";
import { observer } from "mobx-react-lite";

import type { MyLocalUser } from "../stores/local-user.store";

interface LocalUserProps {
  className?: string;
  localUser: MyLocalUser;
}

export const LocalUser = observer(function LocalUser({ className, localUser }: LocalUserProps) {
  return (
    <div className={className}>
      <LocalMicrophoneAndCameraUser
        audioTrack={localUser.micTrack}
        cameraOn={localUser.cameraOn}
        cover={localUser.avatar}
        micOn={localUser.micOn}
        playVideo={localUser.cameraOn}
        videoTrack={localUser.cameraTrack}
      >
        <span className="user-name">{localUser.name}</span>
        {localUser.micOn && <MicControl audioTrack={localUser.micTrack} disabled micOn />}
      </LocalMicrophoneAndCameraUser>
    </div>
  );
});
