import { MicControl, RemoteUser, RemoteVideoTrack } from "agora-rtc-react";
import { observer } from "mobx-react-lite";
import { appStore } from "../stores/app.store";
import { Controls } from "./Controls";
import { LocalUser } from "./LocalUser";
import { Users } from "./Users";

export const Room = observer(function Room() {
  const { localUser, remoteUsers, shareScreen } = appStore.users;

  return (
    <div className="room">
      <div className="tabs">
        <div className="tab">
          <div className="tracks layout" data-size={remoteUsers.length + (localUser ? 1 : 0)}>
            {localUser && <LocalUser className="layout-item" localUser={localUser} />}
            {remoteUsers.map(user => (
              <RemoteUser
                className="layout-item"
                key={user.uid}
                user={user.rtcUser}
                playVideo={user.cameraOn}
                playAudio={user.micOn}
                cover={user.avatar}
              >
                <span className="user-name">{user.name}</span>
                {user.micOn && <MicControl micOn={user.micOn} audioTrack={user.audioTrack} />}
              </RemoteUser>
            ))}
            <RemoteVideoTrack className="share-screen" track={shareScreen.remoteVideoTrack} play />
          </div>
          {localUser && <Controls localUser={localUser} />}
        </div>
        <Users />
      </div>
    </div>
  );
});
