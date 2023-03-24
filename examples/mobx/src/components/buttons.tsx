export function JoinButton({ onClick, isLoading }: { onClick?: () => void; isLoading?: boolean }) {
  return (
    <button className="btn" onClick={onClick} disabled={isLoading}>
      <div className="btn-icon">
        {isLoading ? <i className="i-mdi-loading"></i> : <i className="i-mdi-plus-box"></i>}
      </div>
      <div className="btn-text">Join</div>
    </button>
  );
}

export function NewButton() {
  return (
    <button className="btn" disabled>
      <div className="btn-icon new">
        <i className="i-mdi-video"></i>
      </div>
      <div className="btn-text">New</div>
    </button>
  );
}

export function ScheduleButton() {
  return (
    <button className="btn" disabled>
      <div className="btn-icon">
        <i className="i-mdi-calendar"></i>
      </div>
      <div className="btn-text">Schedule</div>
    </button>
  );
}

export function ScreenShareButton() {
  return (
    <button className="btn" disabled>
      <div className="btn-icon">
        <i className="i-mdi-arrow-up-bold-box"></i>
      </div>
      <div className="btn-text">Share Screen</div>
    </button>
  );
}
