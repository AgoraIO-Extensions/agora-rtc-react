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
import { appConfig, fakeAvatar, fakeName } from "../../utils";

export const UseJoin = () => {
  useJoin({
    appid: appConfig.appId,
    channel: appConfig.channel,
    token: appConfig.token,
  });

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
      <Room cameraOn={cameraOn} micOn={micOn} renderRemoteUsers={renderRemoteUsers} />
      <MediaControl
        cameraOn={cameraOn}
        micOn={micOn}
        setCamera={() => {
          setCamera(a => !a);
        }}
        setMic={() => {
          setMic(a => !a);
        }}
        showCallBtn={false}
      />
    </Container>
  );
};

export default UseJoin;
