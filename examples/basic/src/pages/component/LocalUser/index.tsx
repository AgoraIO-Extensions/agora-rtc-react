import {
  LocalUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
} from "agora-rtc-react";
import { Button, Typography } from "antd";
import { useState } from "react";

import { Container, MediaControl } from "../../../components";
import { appConfig } from "../../../utils";
const { Title } = Typography;

export const LocalUserComponent = () => {
  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    true,
  );

  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);
  return (
    <Container>
      <div className="h-screen p-3 overflow-auto">
        <Title>local user status</Title>
        <Button
          className="m-2"
          onClick={() => {
            setPlayAudio(a => !a);
          }}
          type={playAudio ? "primary" : "default"}
        >
          playAudio : {JSON.stringify(playAudio)}
        </Button>
        <Button
          className="m-2"
          onClick={() => {
            setPlayVideo(a => !a);
          }}
          type={playVideo ? "primary" : "default"}
        >
          playVideo : {JSON.stringify(playVideo)}
        </Button>
        <Button
          className="m-2"
          onClick={() => {
            setPlayVideo(true);
            setCamera(false);
          }}
          type="primary"
        >
          cameraOn=false playVideo=true
        </Button>
        <Button
          className="m-2"
          onClick={() => {
            setPlayVideo(false);
            setCamera(true);
          }}
          type="primary"
        >
          cameraOn=true playVideo=false
        </Button>
        <LocalUser
          audioTrack={localMicrophoneTrack}
          cameraOn={cameraOn}
          className="m-2"
          micOn={micOn}
          playAudio={playAudio}
          playVideo={playVideo}
          style={{ width: "300px", height: "300px" }}
          videoTrack={localCameraTrack}
        />
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

export default LocalUserComponent;
