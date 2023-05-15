import { observer } from "mobx-react-lite";

import { appStore } from "../stores/app.store";

export const Users = observer(function Users() {
  const { localUser, remoteUsers } = appStore.users;

  return (
    <div className="tab2">
      <h3 className="users-title">Users ({remoteUsers.length + 1})</h3>
      <div className="users">
        <div className="user local" key={appStore.uid}>
          <i className="i-mdi-account" />
          <span>{localUser?.name} (You)</span>
          {localUser?.micOn && <i className="i-mdi-microphone" />}
          {localUser?.cameraOn && <i className="i-mdi-video" />}
        </div>
        {remoteUsers.map(user => (
          <div className="user" key={user.uid}>
            <i className="i-mdi-account" />
            <span>{user.name}</span>
            {user.micOn && <i className="i-mdi-microphone" />}
            {user.cameraOn && <i className="i-mdi-video" />}
          </div>
        ))}
      </div>
    </div>
  );
});
