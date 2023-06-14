import {
  RemoteVideoPlayer,
  useAutoJoin,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";
import type { IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { Typography } from "antd";
import { useState } from "react";

import { AutoLayout, Container, Label, MediaControl, Room } from "../../../components";
import { appConfig, fakeAvatar, fakeName } from "../../../utils";

const { Title } = Typography;

export const UseAutoJoin = () => {
  //local
  useAutoJoin(appConfig.appId, appConfig.channel, appConfig.token);

  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);

  // remote
  const remoteUsers = useRemoteUsers();
  const videoTracks = useRemoteVideoTracks(remoteUsers);
  const audioTracks = useRemoteAudioTracks(remoteUsers);
  audioTracks.map(track => track.play());

  const renderRemoteUsers = () => {
    return (
      <>
        {videoTracks.map((track: IRemoteVideoTrack) => (
          <AutoLayout.Item key={track.getUserId()}>
            <RemoteVideoPlayer cover={fakeAvatar()} key={track.getUserId()} track={track} />
            <Label>{`${fakeName(track.getUserId())}{${track.getUserId()}}`}</Label>
          </AutoLayout.Item>
        ))}
      </>
    );
  };
  return (
    <Container>
      <div className="h-screen p-3">
        <Title>useAutoJoin</Title>
        <Room cameraOn={cameraOn} micOn={micOn} renderRemoteUsers={renderRemoteUsers} />
      </div>
      <MediaControl
        cameraOn={cameraOn}
        micOn={micOn}
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

export default UseAutoJoin;
