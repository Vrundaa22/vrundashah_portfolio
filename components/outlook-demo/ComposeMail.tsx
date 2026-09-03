"use client";

import { useEffect, useRef, useState } from "react";

type ComposeMailProps = {
  minimized: boolean;
  onMinimize: () => void;
  onExpand: () => void;
  onClose: () => void;
};

export default function ComposeMail({
  minimized,
  onMinimize,
  onExpand,
  onClose,
}: ComposeMailProps) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const drag = useRef({ active: false, startX: 0, startY: 0, origX: 0, origY: 0 });

  useEffect(() => {
    const margin = 20;
    setPos({
      x: Math.max(margin, window.innerWidth - 480 - margin),
      y: Math.max(margin, window.innerHeight - 420 - margin),
    });
    setReady(true);
  }, []);

  function onDragStart(e: React.PointerEvent) {
    if (!minimized) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onDragMove(e: React.PointerEvent) {
    if (!drag.current.active) return;
    setPos({
      x: drag.current.origX + (e.clientX - drag.current.startX),
      y: drag.current.origY + (e.clientY - drag.current.startY),
    });
  }

  function onDragEnd() {
    drag.current.active = false;
  }

  const title = subject.trim() || "New message";

  if (!ready) return null;

  return (
    <div
      className={`ol-compose${minimized ? " ol-compose--min" : ""}`}
      style={{ left: pos.x, top: pos.y }}
      role="dialog"
      aria-label={minimized ? title : "Compose email"}
    >
      <header
        className="ol-compose-head"
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      >
        <span className="ol-compose-head-title">{title}</span>
        <div className="ol-compose-head-actions">
          {!minimized ? (
            <button type="button" onClick={onMinimize} aria-label="Minimize">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" strokeLinecap="round" />
              </svg>
            </button>
          ) : (
            <button type="button" onClick={onExpand} aria-label="Expand">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="5" width="14" height="14" rx="1" />
              </svg>
            </button>
          )}
          <button type="button" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {!minimized ? (
        <div className="ol-compose-body">
          <label className="ol-compose-field">
            <span>To</span>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Recipients"
            />
          </label>
          <label className="ol-compose-field">
            <span>Subject</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
            />
          </label>
          <textarea
            className="ol-compose-text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your message…"
          />
          <div className="ol-compose-foot">
            <button type="button" className="ol-compose-send">
              Send
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
