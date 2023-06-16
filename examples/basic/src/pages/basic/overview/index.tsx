import {
  useJoin,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";
import { useState } from "react";

import { Container, MediaControl, Room } from "../../../components";
import { RenderRemoteUsers } from "../../../components/RemoteUsers";
import { appConfig } from "../../../utils";

export const Overview = () => {
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
  const { videoTracks } = useRemoteVideoTracks(remoteUsers);
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  audioTracks.map(track => track.play());

  return (
    <Container>
      {calling ? (
        <Room
          cameraOn={cameraOn}
          micOn={micOn}
          renderRemoteUsers={() => <RenderRemoteUsers videoTracks={videoTracks} />}
        />
      ) : (
        <Container />
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

export default Overview;
