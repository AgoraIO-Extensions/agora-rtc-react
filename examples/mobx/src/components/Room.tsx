import {
  CameraControl,
  CameraVideoTrack,
  MicControl,
  MicrophoneAudioTrack,
  RemoteUser,
  UserCover,
} from "agora-rtc-react";
import { observer } from "mobx-react-lite";
import { appStore } from "../stores/app.store";

export const Room = observer(function Room() {
  const { localUser, remoteUsers } = appStore.users;

  return (
    <div style={{ padding: "8px 0", flex: 1, display: "flex", gap: 8 }}>
      {/* Local User */}
      <div
        style={{
          width: 288,
          height: 216,
          background: "#000",
          position: "relative",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <MicrophoneAudioTrack track={localUser?.micTrack} />
        <CameraVideoTrack
          style={{ width: "100%", height: "100%" }}
          track={localUser?.cameraTrack}
          play
        />
        {!localUser?.cameraOn && (
          <UserCover
            cover={localUser?.avatar}
            style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}
          />
        )}
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
          <span style={{ userSelect: "none" }}>{localUser?.name} (Me)</span>
          <CameraControl
            style={{ margin: "0 10px 0 auto" }}
            cameraOn={localUser?.cameraOn}
            onCameraChange={localUser?.setCamera}
          />
          <MicControl
            audioTrack={localUser?.micTrack}
            micOn={localUser?.micOn}
            onMicChange={localUser?.setMic}
          />
        </div>
      </div>
      {/* Remote Users */}
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
