export function JoinButton({ onClick, isLoading }: { onClick?: () => void; isLoading?: boolean }) {
  return (
    <button className="btn" disabled={isLoading} onClick={onClick}>
      <div className="btn-icon">
        {isLoading ? <i className="i-mdi-loading" /> : <i className="i-mdi-plus-box" />}
      </div>
      <div className="btn-text">Join</div>
    </button>
  );
}

export function NewButton() {
  return (
    <button className="btn" disabled>
      <div className="btn-icon new">
        <i className="i-mdi-video" />
      </div>
      <div className="btn-text">New</div>
    </button>
  );
}

export function ScheduleButton() {
  return (
    <button className="btn" disabled>
      <div className="btn-icon">
        <i className="i-mdi-calendar" />
      </div>
      <div className="btn-text">Schedule</div>
    </button>
  );
}

export function ScreenShareButton() {
  return (
    <button className="btn" disabled>
      <div className="btn-icon">
        <i className="i-mdi-arrow-up-bold-box" />
      </div>
      <div className="btn-text">Share Screen</div>
    </button>
  );
}
