import { RemoteUser } from "agora-rtc-react";
import { MicControl } from "agora-rtc-react-ui";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { appStore } from "../stores/app.store";
import { shareScreen } from "../stores/share-screen.store";
import { Controls } from "./Controls";
import { LocalUser } from "./LocalUser";
import { ShareScreenTracks } from "./ShareScreenTracks";
import { Users } from "./Users";

export const Room = observer(function Room() {
  const { localUser, remoteUsers } = appStore.users;

  // update share screen tracks
  useEffect(() => {
    const shareScreenUser = remoteUsers.find(user => user.uid === shareScreen.uid);
    if (shareScreenUser) {
      shareScreen.setRemoteTrack(shareScreenUser.audioTrack || null, "audio");
      shareScreen.setRemoteTrack(shareScreenUser.videoTrack || null, "video");
    } else {
      shareScreen.setRemoteTrack(null, "audio");
      shareScreen.setRemoteTrack(null, "video");
    }
  }, [remoteUsers]);

  const shareScreenUser = remoteUsers.find(user => user.uid === shareScreen.uid)?.rtcUser;
  const remoteUsersNoShareScreen = remoteUsers.filter(user => user.uid !== shareScreen.uid);

  return (
    <div className="room">
      <div className="tabs">
        <div className="tab">
          <div
            className="tracks layout"
            data-size={remoteUsersNoShareScreen.length + (localUser ? 1 : 0)}
          >
            {localUser && <LocalUser className="layout-item" localUser={localUser} />}
            {remoteUsersNoShareScreen.map(user => (
              <div key={user.uid} className="layout-item">
                <RemoteUser user={user.rtcUser} cover={user.avatar}>
                  <span className="user-name">{user.name}</span>
                  {user.micOn && <MicControl micOn disabled audioTrack={user.audioTrack} />}
                </RemoteUser>
              </div>
            ))}
            {shareScreenUser && <ShareScreenTracks user={shareScreenUser} />}
          </div>
          {localUser && <Controls localUser={localUser} />}
        </div>
        <Users />
      </div>
    </div>
  );
});
