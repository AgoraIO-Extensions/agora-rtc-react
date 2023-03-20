import { CameraControl, MicControl, RemoteUser } from "agora-rtc-react";
import { observer } from "mobx-react-lite";
import { appStore } from "../stores/app.store";
import { LocalUser } from "./LocalUser";

export const Room = observer(function Room() {
  const { remoteUsers } = appStore.users;

  return (
    <div style={{ padding: "8px 0", flex: 1, display: "flex", gap: 8 }}>
      <LocalUser />
      {remoteUsers.map(user => (
        <RemoteUser
          key={user.uid}
          user={user.rtcUser}
          style={{ borderRadius: 8, overflow: "hidden" }}
          cover={user.avatar}
          playVideo={user.cameraOn}
          playAudio={user.micOn}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              boxSizing: "border-box",
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              padding: "4px 4px 4px 8px",
              color: "#fff",
            }}
          >
            <span style={{ userSelect: "none" }}>{user.name}</span>
            <CameraControl style={{ margin: "0 10px 0 auto" }} cameraOn={user.cameraOn} disabled />
            <MicControl audioTrack={user.audioTrack} micOn={user.micOn} disabled />
          </div>
        </RemoteUser>
      ))}
    </div>
  );
});
