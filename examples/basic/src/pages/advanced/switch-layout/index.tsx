import "./index.scss";
import {
  RemoteVideoPlayer,
  useJoin,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";
import type { IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { Button, Typography } from "antd";
import { useState } from "react";

import { AutoLayout, Container, Label, MediaControl, Room } from "../../../components";
import { appConfig, fakeAvatar, fakeName } from "../../../utils";
const { Title, Paragraph, Text } = Typography;

export const SwitchLayout = () => {
  const [calling, setCalling] = useState(false);

  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    calling,
  );

  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);

  const remoteUsers = useRemoteUsers();

  const [layout, setLayout] = useState<boolean>(true);

  const videoTracks = useRemoteVideoTracks(
    layout ? remoteUsers : remoteUsers.filter((_user, index) => index == 0),
  );

  const audioTracks = useRemoteAudioTracks(remoteUsers);

  audioTracks.map(track => track.play());

  const renderAction = () => {
    return (
      <div className="p-4 text-xl">
        <Button onClick={() => setLayout(layout => !layout)} type="primary">
          {`switch to layout ${layout ? 2 : 1}`}
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
      <MediaControl
        calling={calling}
        cameraOn={cameraOn}
        micOn={micOn}
        setCalling={() => {
          setCalling(a => !a);
        }}
        setCamera={() => {
          setCamera(a => !a);
        }}
        setMic={() => {
          setMic(a => !a);
        }}
      />
    </Container>
  );
};

function Layout1({ videoTracks }: { videoTracks: IRemoteVideoTrack[] }) {
  return (
    <>
      {videoTracks.map((track: IRemoteVideoTrack) => (
        <AutoLayout.Item key={track.getUserId()}>
          <RemoteVideoPlayer cover={fakeAvatar()} key={track.getUserId()} track={track} />
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
          <RemoteVideoPlayer cover={fakeAvatar()} key={track.getUserId()} track={track} />
          <Label>{`Layout2 ${fakeName(track.getUserId())}{${track.getUserId()}}`}</Label>
        </AutoLayout.Item>
      ))}
    </>
  );
}

export default SwitchLayout;
