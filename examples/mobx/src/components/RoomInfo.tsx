import { useEffect, useState } from "react";

export function RoomInfo({ onJoin }: { onJoin?: () => void }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const ticket = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(ticket);
  }, []);

  const datetime = new Date(now);
  const time =
    datetime &&
    datetime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  const date =
    datetime &&
    datetime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "long",
    });

  return (
    <div className="room-info">
      <div className="datetime">
        <div className="time">{time}</div>
        <div className="date">{date}</div>
      </div>
      <div className="actions">
        <article className="info">
          <h3 className="info-title">Example Meeting</h3>
          <p className="info-time">11:00~16:00</p>
        </article>
        <button className="action-start" onClick={onJoin}>
          Start
        </button>
      </div>
    </div>
  );
}
