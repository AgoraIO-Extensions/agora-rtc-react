import { observer } from "mobx-react-lite";
import { appStore } from "../stores/app.store";
import { shareScreen } from "../stores/share-screen.store";

export const Users = observer(function Users() {
  const { localUser, remoteUsers } = appStore.users;

  return (
    <div className="tab2">
      <h3 className="users-title">Users ({remoteUsers.length + 1})</h3>
      <div className="users">
        <div key={appStore.uid} className="user local">
          <i className="i-mdi-account"></i>
          <span>{localUser?.name} (You)</span>
          {localUser?.micOn && <i className="i-mdi-microphone"></i>}
          {localUser?.cameraOn && <i className="i-mdi-video"></i>}
        </div>
        {remoteUsers
          .filter(user => user.uid !== shareScreen.uid)
          .map(user => (
            <div key={user.uid} className="user">
              <i className="i-mdi-account"></i>
              <span>{user.name}</span>
              {user.micOn && <i className="i-mdi-microphone"></i>}
              {user.cameraOn && <i className="i-mdi-video"></i>}
            </div>
          ))}
      </div>
    </div>
  );
});
