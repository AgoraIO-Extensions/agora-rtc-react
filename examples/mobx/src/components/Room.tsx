import { RemoteUser } from "agora-rtc-react";
import { MicControl } from "agora-rtc-react-ui";
import { observer } from "mobx-react-lite";

import { appStore } from "../stores/app.store";

import { Controls } from "./Controls";
import { LocalUser } from "./LocalUser";
import { ShareScreenTracks } from "./ShareScreenTracks";
import { Users } from "./Users";

export const Room = observer(function Room() {
  const { localUser, remoteUsers } = appStore.users;

  return (
    <div className="room">
      <div className="tabs">
        <div className="tab">
          <div className="tracks layout" data-size={remoteUsers.length + (localUser ? 1 : 0)}>
            {localUser && <LocalUser className="layout-item" localUser={localUser} />}
            {remoteUsers.map(user => (
              <div className="layout-item" key={user.uid}>
                <RemoteUser
                  cover={user.avatar}
                  playAudio={user.micOn}
                  playVideo={user.cameraOn}
                  user={user.rtcUser}
                >
                  <span className="user-name">{user.name}</span>
                  {user.micOn && <MicControl audioTrack={user.audioTrack} disabled micOn />}
                </RemoteUser>
              </div>
            ))}
            <ShareScreenTracks />
          </div>
          {localUser && <Controls localUser={localUser} />}
        </div>
        <Users />
      </div>
    </div>
  );
});
