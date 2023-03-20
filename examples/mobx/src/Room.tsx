import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";

import {
  AgoraRTCProvider,
  CameraControl,
  CameraVideoTrack,
  MicControl,
  MicrophoneAudioTrack,
  RemoteUser,
  UserCover,
} from "agora-rtc-react";
import { observer } from "mobx-react-lite";
import { appStore } from "./store";

export const Room = observer(function Room({ client }: { client: IAgoraRTCClient }) {
  return (
    <AgoraRTCProvider client={client}>
      <div style={{ padding: "8px 0", flex: 1, display: "flex", gap: 8 }}>
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
          <MicrophoneAudioTrack track={appStore.localUser?.micTrack} />
          <CameraVideoTrack
            style={{ width: "100%", height: "100%" }}
            track={appStore.localUser?.cameraTrack}
            play
          />
          {!appStore.localUser?.cameraOn && (
            <UserCover
              cover={appStore.avatar}
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
            <span style={{ userSelect: "none" }}>{appStore.name} (Me)</span>
            <CameraControl
              style={{ margin: "0 10px 0 auto" }}
              cameraOn={appStore.localUser?.cameraOn}
              onCameraChange={appStore.localUser?.setCamera}
            />
            <MicControl
              audioTrack={appStore.localUser?.micTrack}
              micOn={appStore.localUser?.micOn}
              onMicChange={appStore.localUser?.setMic}
            />
          </div>
        </div>
        {appStore.remoteUsers.map(user => (
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
              <CameraControl
                style={{ margin: "0 10px 0 auto" }}
                cameraOn={user.cameraOn}
                disabled
              />
              <MicControl audioTrack={user.audioTrack} micOn={user.micOn} disabled />
            </div>
          </RemoteUser>
        ))}
      </div>
    </AgoraRTCProvider>
  );
});
