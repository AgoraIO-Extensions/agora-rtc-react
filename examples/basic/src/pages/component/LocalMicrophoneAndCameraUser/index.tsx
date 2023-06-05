import {
  LocalAudioTrack,
  LocalMicrophoneAndCameraUser,
  useCurrentUID,
  useJoin,
  useLocalAudioTrack,
  useLocalCameraTrack,
  usePublish,
} from "agora-rtc-react";
import { Typography } from "antd";
import { useEffect, useMemo, useState } from "react";

import { Container, MediaControl } from "../../../components";
import { appConfig, fakeAvatar } from "../../../utils";
const { Title, Paragraph } = Typography;

export const LocalMicrophoneAndCameraUserComponent = () => {
  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    true,
  );
  const uid = useCurrentUID() || 0;

  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);
  const userAvatar = useMemo(() => fakeAvatar(uid), [uid]);

  const [audioTrackState, setAudioTrackState] = useState<{
    muted: boolean;
    isPlaying: boolean;
    enabled: boolean;
  }>();
  const audioTrack = useLocalAudioTrack();
  const videoTrack = useLocalCameraTrack();

  usePublish([audioTrack, videoTrack]);
  useEffect(() => {
    if (audioTrack) {
      setAudioTrackState({
        muted: audioTrack.muted,
        isPlaying: audioTrack.isPlaying,
        enabled: audioTrack.enabled,
      });
    }
  }, [micOn, audioTrack]);
  return (
    <Container>
      <div className="h-screen p-3">
        <Title>local audio track status</Title>
        {audioTrackState && (
          <>
            <Paragraph>{`muted: ${audioTrackState?.muted}`}</Paragraph>
            <Paragraph>{`isPlaying: ${audioTrackState.isPlaying}`}</Paragraph>
            <Paragraph>{`enabled: ${audioTrackState?.enabled}`}</Paragraph>
          </>
        )}
        <LocalMicrophoneAndCameraUser
          audioTrack={audioTrack}
          cameraOn={cameraOn}
          cover={userAvatar}
          micOn={micOn}
          videoTrack={videoTrack}
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

export default LocalMicrophoneAndCameraUserComponent;
