import {
  CameraControl,
  MicControl,
  RemoteAudioTrack,
  RemoteUser,
  RemoteVideoTrack,
} from "agora-rtc-react";
import { observer } from "mobx-react-lite";
import { appStore } from "../stores/app.store";
import { LocalUser } from "./LocalUser";

export const Room = observer(function Room() {
  const { remoteUsers, shareScreen } = appStore.users;

  return (
    <div style={{ padding: "8px 0", flex: 1, display: "flex", gap: 8 }}>
      {shareScreen.remoteAudioTrack && (
        <RemoteAudioTrack track={shareScreen.remoteAudioTrack} play />
      )}
      {shareScreen.remoteVideoTrack && (
        <RemoteVideoTrack
          style={{
            width: 400,
            height: 300,
            background: "#000",
            position: "relative",
            border: "1px solid",
            borderRadius: 8,
            overflow: "hidden",
          }}
          track={shareScreen.remoteVideoTrack}
          play
        />
      )}
      {appStore.uid && <LocalUser />}
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
