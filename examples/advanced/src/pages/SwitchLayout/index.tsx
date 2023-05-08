import type { IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import "./index.scss";
import {
  RemoteVideoPlayer,
  useIsConnected,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";
import { SVGCamera, SVGCameraMute, SVGMicrophone, SVGMicrophoneMute } from "agora-rtc-react-ui";

import clsx from "clsx";
import { useState } from "react";

import { AutoLayout, Container, Label, Room } from "../../components";
import { Button, Typography } from "antd";
import { fakeAvatar, fakeName } from "../../utils";
const { Title, Paragraph, Text } = Typography;

AgoraRTC.setLogLevel(/* warning */ 2);
export const SwitchLayout = () => {
  const isConnected = useIsConnected();

  const [calling, setCalling] = useState(false);
  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);

  const remoteUsers = useRemoteUsers();

  const [layout, setLayout] = useState<boolean>(true);

  const {
    videoTracks,
    ready: videoTracksIsReady,
    error: videoTracksError,
  } = useRemoteVideoTracks(layout ? remoteUsers : remoteUsers.filter((_user, index) => index == 0));

  const {
    audioTracks,
    ready: audioTracksIsReady,
    error: audioTracksError,
  } = useRemoteAudioTracks(remoteUsers);

  audioTracks.map(track => track.play());
  if (isConnected) {
    console.log("videoTracks:", videoTracks, videoTracksIsReady, videoTracksError);
    console.log("audioTracks:", audioTracks, audioTracksIsReady, audioTracksError);
  }

  const renderAction = () => {
    return (
      <div className="p-4 text-xl">
        <Button onClick={() => setLayout(layout => !layout)} type="primary">
          {`switch to layout ${layout ? 1 : 2}`}
        </Button>
      </div>
    );
  };
  const renderRemoteUsers = () => {
    return (
      <>{layout ? <Layout1 videoTracks={videoTracks} /> : <Layout2 videoTracks={videoTracks} />}</>
    );
  };
  return (
    <Container>
      {calling ? (
        <Room
          cameraOn={cameraOn}
          micOn={micOn}
          renderAction={renderAction}
          renderRemoteUsers={renderRemoteUsers}
        />
      ) : (
        <div className="h-screen p-3">
          <Title>SwitchLayout</Title>
          <Paragraph>
            By using <Text keyboard>useRemoteVideoTracks</Text> hook to dynamically switch the
            camera track, this will not generate a new track, but only dynamically subscribe and
            unsubscribe the track according to your needs.
          </Paragraph>
        </div>
      )}
      {/* Camera and Microphone Controls */}
      <div className="inset-0 top-a flex justify-center items-center gap-3 px-6 py-3 bg-#21242c c-coolgray-3">
        <div className="flex-1 flex top-0 left-0 h-full items-center gap-3 px-6 py-3">
          <button className="btn" onClick={() => setMic(a => !a)}>
            {micOn ? <SVGMicrophone /> : <SVGMicrophoneMute />}
          </button>
          <button className="btn" onClick={() => setCamera(a => !a)}>
            {cameraOn ? <SVGCamera /> : <SVGCameraMute />}
          </button>
        </div>
        <button
          className={clsx("btn btn-phone", { "btn-phone-active": calling })}
          onClick={() => setCalling(a => !a)}
        >
          {calling ? <i className="i-mdi-phone-hangup" /> : <i className="i-mdi-phone" />}
        </button>
      </div>
    </Container>
  );
};

function Layout1({ videoTracks }: { videoTracks: IRemoteVideoTrack[] }) {
  return (
    <>
      {videoTracks.map((track: IRemoteVideoTrack) => (
        <AutoLayout.Item key={track.getUserId()}>
          <RemoteVideoPlayer
            cover={fakeAvatar(track.getUserId())}
            key={track.getUserId()}
            track={track}
          />
          <Label>{`Layout1 ${fakeName(track.getUserId())}{${track.getUserId()}}`}</Label>
        </AutoLayout.Item>
      ))}
    </>
  );
}

function Layout2({ videoTracks }: { videoTracks: IRemoteVideoTrack[] }) {
  return (
    <>
      {videoTracks.map((track: IRemoteVideoTrack) => (
        <AutoLayout.Item key={track.getUserId()}>
          <RemoteVideoPlayer
            cover={fakeAvatar(track.getUserId())}
            key={track.getUserId()}
            track={track}
          />
          <Label>{`Layout2 ${fakeName(track.getUserId())}{${track.getUserId()}}`}</Label>
        </AutoLayout.Item>
      ))}
    </>
  );
}

export default SwitchLayout;
