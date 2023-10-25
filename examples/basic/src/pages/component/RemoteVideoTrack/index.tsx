import type { IRemoteVideoTrack } from "agora-rtc-react";
import { RemoteVideoTrack, useJoin, useRemoteUsers, useRemoteVideoTracks } from "agora-rtc-react";
import { Button, Typography } from "antd";
import { useEffect, useState } from "react";

import { Container, MediaControl } from "../../../components";
import { appConfig } from "../../../utils";
const { Title } = Typography;

interface videoTrackStateList {
  isPlay: boolean;
  id: string;
  track: IRemoteVideoTrack;
}

export const RemoteVideoTrackComponent = () => {
  const [calling, setCalling] = useState(false);

  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    calling,
  );

  const [videoTrackStateList, setVideoTrackStateList] = useState<videoTrackStateList[]>();

  const remoteUsers = useRemoteUsers();
  const { videoTracks } = useRemoteVideoTracks(remoteUsers);

  useEffect(() => {
    if (videoTracks && videoTracks.length > 0) {
      const stateList: videoTrackStateList[] = [];
      videoTracks.map(track => {
        stateList.push({ isPlay: true, id: track.getTrackId(), track: track });
      });
      setVideoTrackStateList(stateList);
    } else {
      setVideoTrackStateList([]);
    }
  }, [videoTracks]);

  useEffect(() => {
    if (!calling) {
      setVideoTrackStateList([]);
    }
  }, [calling]);

  return (
    <Container>
      <div className="h-screen p-3">
        <Title>remote video track status</Title>
        {videoTrackStateList &&
          videoTrackStateList.length > 0 &&
          videoTrackStateList.map(item => (
            <div key={item.id}>
              <div className="p-4 text-xl">
                <Button
                  onClick={() => {
                    item.isPlay = !item.isPlay;
                    setVideoTrackStateList([...videoTrackStateList]);
                  }}
                  type="primary"
                >
                  {`switch this remote video track play status`}
                </Button>
              </div>
              <div className="p-4 text-xl">
                <RemoteVideoTrack
                  play={item.isPlay}
                  style={{ width: "150px", height: "100px" }}
                  track={item.track}
                />
              </div>
            </div>
          ))}
      </div>
      <MediaControl
        calling={calling}
        setCalling={() => {
          setCalling(a => !a);
        }}
      />
    </Container>
  );
};

export default RemoteVideoTrackComponent;
