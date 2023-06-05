import {
  RemoteVideoPlayer,
  useJoin,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";
import type { IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { Typography } from "antd";
import { useState } from "react";

import { AutoLayout, Container, Label, MediaControl, Room } from "../../../components";
import { appConfig, fakeAvatar, fakeName } from "../../../utils";

const { Title, Paragraph, Text } = Typography;

export const UseJoin = () => {
  const [calling, setCalling] = useState(false);

  // you can use useJoin like this by passing a function as first argument.
  // useJoin(async () => {
  //   //you can do some actions like fetching token before calling join.
  //   const getData = await fakeFetch("/get-token");
  //   return JSON.parse(getData);
  // }, calling);

  //local
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
      {calling ? (
        <Room cameraOn={cameraOn} micOn={micOn} renderRemoteUsers={renderRemoteUsers} />
      ) : (
        <div className="h-screen p-3">
          <Title>UseJoin</Title>
          <Paragraph>
            By using <Text keyboard>UseJoin</Text> hook to join room.
          </Paragraph>
          <Paragraph>you can do some actions like fetching token before calling join.</Paragraph>
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

export default UseJoin;
