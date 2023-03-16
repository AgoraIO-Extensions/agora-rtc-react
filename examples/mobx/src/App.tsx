import type { IAgoraRTCClient, UID } from "agora-rtc-sdk-ng";

import {
  AgoraRTCProvider,
  CameraControl,
  CameraVideoTrack,
  MicControl,
  MicrophoneAudioTrack,
  RemoteUser,
} from "agora-rtc-react";
import { observer } from "mobx-react-lite";
import { appStore } from "./store";

import "agora-rtc-react/dist/agora-rtc-react.css";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

const fakeName = (uid: UID): string => {
  faker.seed(Number(uid));
  return faker.name.firstName();
};

const appId = import.meta.env.AGORA_APPID;
const channel = import.meta.env.AGORA_CHANNEL;
const token = import.meta.env.AGORA_TOKEN;

export const App = observer(function App() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        padding: 8,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <button
          disabled={appStore.connectionState !== "DISCONNECTED"}
          onClick={() => appStore.join(appId, channel, token)}
        >
          JOIN
        </button>
        &nbsp;
        <button
          disabled={appStore.connectionState !== "CONNECTED"}
          onClick={() => appStore.leave()}
        >
          LEAVE
        </button>
        &nbsp;
        {appStore.uid && <samp>[UID={appStore.uid}]</samp>}
        &nbsp;
        {appStore.client && (
          <>
            <span>Users: </span>
            {[appStore, ...appStore.remoteUsersAsArray].map(({ uid }) => fakeName(uid!)).join(", ")}
          </>
        )}
      </div>
      {appStore.client && <Room client={appStore.client} />}
    </div>
  );
});

const Room = observer(function Room({ client }: { client: IAgoraRTCClient }) {
  const [audio, setAudio] = useState(false);
  useEffect(() => {
    if (audio && !appStore.localMicTrack) {
      appStore.createLocalMicTrack();
    }
    if (appStore.localMicTrack) {
      appStore.localMicTrack.setEnabled(audio);
    }
  }, [audio]);

  const [video, setVideo] = useState(false);
  useEffect(() => {
    if (video && !appStore.localCameraTrack) {
      appStore.createLocalCameraTrack();
    }
    if (appStore.localCameraTrack) {
      appStore.localCameraTrack.setEnabled(video);
    }
  }, [video]);

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
          <MicrophoneAudioTrack track={appStore.localMicTrack} />
          <CameraVideoTrack
            style={{ width: "100%", height: "100%" }}
            track={appStore.localCameraTrack}
            play
          />
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
            <span style={{ userSelect: "none" }}>{fakeName(appStore.uid!)}</span>
            <CameraControl
              style={{ margin: "0 10px 0 auto" }}
              cameraOn={video}
              onCameraChange={setVideo}
            />
            <MicControl audioTrack={appStore.localMicTrack} micOn={audio} onMicChange={setAudio} />
          </div>
        </div>
        {[...appStore.publishedRemoteUsers.values()].map(user => (
          <RemoteUser key={user.uid} user={user} style={{ borderRadius: 8, overflow: "hidden" }}>
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
              <span style={{ userSelect: "none" }}>{fakeName(user.uid)}</span>
              <CameraControl style={{ margin: "0 10px 0 auto" }} cameraOn={user.hasVideo} />
              <MicControl audioTrack={user.audioTrack} micOn={user.hasAudio} />
            </div>
          </RemoteUser>
        ))}
      </div>
    </AgoraRTCProvider>
  );
});
