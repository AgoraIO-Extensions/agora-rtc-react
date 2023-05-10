import type { IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import {
  RemoteVideoPlayer,
  useJoin,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";
import { useState } from "react";

import { AutoLayout, Container, Label, MediaControl, Room } from "../../components";
import { fakeAvatar, fakeFetch, fakeName } from "../../utils";
import { Typography } from "antd";
const { Title, Paragraph, Text } = Typography;

export const UseJoinAfterAction = () => {
  const [isReady, setIsReady] = useState(false);

  useJoin(async () => {
    //you can do some actions like fetching token before calling join.
    const getData = await fakeFetch("/get-token");
    return JSON.parse(getData);
  }, isReady);
  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);

  const remoteUsers = useRemoteUsers();

  const videoTracks = useRemoteVideoTracks(remoteUsers);

  const audioTracks = useRemoteAudioTracks(remoteUsers);

  audioTracks.map(track => track.play());

  const renderRemoteUsers = () => {
    return (
      <>
        {videoTracks.map((track: IRemoteVideoTrack) => (
          <AutoLayout.Item key={track.getUserId()}>
            <RemoteVideoPlayer
              cover={fakeAvatar(track.getUserId())}
              key={track.getUserId()}
              track={track}
            />
            <Label>{`${fakeName(track.getUserId())}{${track.getUserId()}}`}</Label>
          </AutoLayout.Item>
        ))}
      </>
    );
  };
  return (
    <Container>
      {isReady ? (
        <Room cameraOn={cameraOn} micOn={micOn} renderRemoteUsers={renderRemoteUsers} />
      ) : (
        <div className="h-screen p-3">
          <Title>UseJoinAfterAction</Title>
          <Paragraph>
            By using <Text keyboard>UseJoin</Text> hook to join room.
          </Paragraph>
          <Paragraph>you can do some actions like fetching token before calling join.</Paragraph>
        </div>
      )}
      <MediaControl
        calling={isReady}
        cameraOn={cameraOn}
        micOn={micOn}
        setCalling={() => {
          setIsReady(a => !a);
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

export default UseJoinAfterAction;
