import type { MyLocalUser } from "../stores/local-user.store";

import { observer } from "mobx-react-lite";
import { clsx } from "clsx";
import { appStore } from "../stores/app.store";
import { shareScreen } from "../stores/share-screen.store";

interface ControlsProps {
  localUser: MyLocalUser;
}

export const Controls = observer(function Controls({ localUser }: ControlsProps) {
  return (
    <div className="controls">
      <button
        className={clsx("btn", { active: localUser.micOn })}
        onClick={() => localUser.setMic(!localUser.micOn)}
      >
        {localUser.micOn ? (
          <i className="i-mdi-microphone" />
        ) : (
          <i className="i-mdi-microphone-off" />
        )}
        <span className="btn-text">{localUser.micOn ? "Mute" : "Unmute"}</span>
      </button>
      <button
        className={clsx("btn", { active: localUser.cameraOn })}
        onClick={() => localUser.setCamera(!localUser.cameraOn)}
      >
        {localUser.cameraOn ? <i className="i-mdi-video" /> : <i className="i-mdi-video-off" />}
        <span className="btn-text">Video</span>
      </button>
      <div className="flex-1"></div>
      <button
        className={clsx("btn", { active: shareScreen.enabled })}
        disabled={shareScreen.remoteVideoTrack != null}
        onClick={() => shareScreen.enable()}
      >
        <i className="i-mdi-arrow-up-bold-box" />
        <span className="btn-text">Share Screen</span>
      </button>
      <div className="flex-1"></div>
      <button className="btn btn-quit" onClick={() => appStore.leave()}>
        <i className="i-mdi-exit-to-app"></i>
        <span className="btn-text">Quit</span>
      </button>
    </div>
  );
});
