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

const [appId, channel, token] = [
  import.meta.env.AGORA_APPID,
  import.meta.env.AGORA_CHANNEL,
  import.meta.env.AGORA_TOKEN,
];

export const App = observer(function App() {
  return (
    <>
      <button
        disabled={appStore.connectionState !== "DISCONNECTED"}
        onClick={() => appStore.join(appId, channel, token)}
      >
        JOIN
      </button>
      &nbsp;
      <button disabled={appStore.connectionState !== "CONNECTED"} onClick={() => appStore.leave()}>
        LEAVE
      </button>
      {appStore.client && <Room client={appStore.client} />}
    </>
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
      <samp>&nbsp;[UID={appStore.uid}]</samp>
      <div
        style={{
          display: "inline-block",
          float: "right",
          width: 320,
          height: 240,
          background: "#000",
          position: "relative",
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
          <MicControl uid={appStore.uid} micOn={audio} onMicChange={setAudio} />
        </div>
      </div>
      <br />
      <span>Users:</span>
      {[appStore, ...appStore.remoteUsersAsArray].map(({ uid }) => (
        <span key={uid} style={{ marginLeft: ".25rem" }}>
          {fakeName(uid!)}
        </span>
      ))}
      <br />
      {[...appStore.publishedRemoteUsers.values()].map(user => (
        <RemoteUser key={user.uid} user={user}>
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
            <MicControl uid={user.uid} micOn={user.hasAudio} />
          </div>
        </RemoteUser>
      ))}
    </AgoraRTCProvider>
  );
});
