import { LocalAudioTrack, useJoin, useLocalAudioTrack, usePublish } from "agora-rtc-react";
import { Typography } from "antd";
import { useEffect, useState } from "react";

import { Container, MediaControl } from "../../../components";
import { appConfig } from "../../../utils";
const { Title, Paragraph } = Typography;

export const LocalAudioTrackComponent = () => {
  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    true,
  );

  const [micOn, setMic] = useState(false);
  const [audioTrackState, setAudioTrackState] = useState<{
    muted: boolean;
    isPlaying: boolean;
    enabled: boolean;
  }>();
  const audioTrack = useLocalAudioTrack();
  usePublish([audioTrack]);
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
        <LocalAudioTrack play={micOn} track={audioTrack} />
      </div>
      <MediaControl
        micOn={micOn}
        setMic={() => {
          setMic(a => !a);
        }}
      />
    </Container>
  );
};

export default LocalAudioTrackComponent;
