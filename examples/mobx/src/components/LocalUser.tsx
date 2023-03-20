import {
  CameraControl,
  CameraVideoTrack,
  MicControl,
  MicrophoneAudioTrack,
  UserCover,
} from "agora-rtc-react";
import { observer } from "mobx-react-lite";
import { appStore } from "../stores/app.store";

export const LocalUser = observer(function LocalUser() {
  const { localUser } = appStore.users;

  return (
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
  );
});
