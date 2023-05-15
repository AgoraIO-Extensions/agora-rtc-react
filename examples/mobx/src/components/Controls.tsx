import { clsx } from "clsx";
import { observer } from "mobx-react-lite";

import { appStore } from "../stores/app.store";
import type { MyLocalUser } from "../stores/local-user.store";

interface ControlsProps {
  localUser: MyLocalUser;
}

export const Controls = observer(function Controls({ localUser }: ControlsProps) {
  const { shareScreen } = appStore;

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
      <div className="flex-1" />
      <button
        className={clsx("btn", { active: shareScreen.enabled })}
        disabled={shareScreen.remoteVideoTrack != null}
        onClick={() => (shareScreen.enabled ? shareScreen.disable() : shareScreen.enable())}
      >
        <i className="i-mdi-arrow-up-bold-box" />
        <span className="btn-text">Share Screen</span>
      </button>
      <div className="flex-1" />
      <button className="btn btn-quit" onClick={() => appStore.leave()}>
        <i className="i-mdi-exit-to-app" />
        <span className="btn-text">Quit</span>
      </button>
    </div>
  );
});
