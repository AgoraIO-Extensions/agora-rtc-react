import { RemoteVideoTrack } from "agora-rtc-react";
import { observer } from "mobx-react-lite";

import { appStore } from "../stores/app.store";

export const ShareScreenTracks = observer(function ShareScreenTracks() {
  const { shareScreen } = appStore;
  return <RemoteVideoTrack className="share-screen" play track={shareScreen.remoteVideoTrack} />;
});
