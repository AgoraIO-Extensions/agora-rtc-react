import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { RemoteVideoTrack, useRemoteUserTrack } from "agora-rtc-react";
import { observer } from "mobx-react-lite";

interface ShareScreenTracksProps {
  user?: IAgoraRTCRemoteUser;
}

export const ShareScreenTracks = observer(function ShareScreenTracks({
  user,
}: ShareScreenTracksProps) {
  const track = useRemoteUserTrack(user, "video");
  return <RemoteVideoTrack className="share-screen" track={track} play />;
});
