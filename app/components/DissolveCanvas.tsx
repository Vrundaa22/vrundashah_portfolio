"use client";

import { useEffect, useRef, useState } from "react";

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

export default function DissolveCanvas({
  dark = false,
  onDraw,
}: {
  dark?: boolean;
  onDraw?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const hasDrawnRef = useRef(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!isTouchDevice());
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let frameId = 0;
    const dissolve = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.032)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";
      frameId = requestAnimationFrame(dissolve);
    };

    frameId = requestAnimationFrame(dissolve);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const strokeColor = dark
      ? "rgba(255, 255, 255, 0.28)"
      : "rgba(194, 94, 100, 0.32)";

    const drawLine = (x: number, y: number) => {
      const last = lastPointRef.current;
      if (!last) return;

      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.25;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    };

    const noteDraw = () => {
      if (hasDrawnRef.current) return;
      hasDrawnRef.current = true;
      onDraw?.();
    };

    const pointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      drawingRef.current = true;
      lastPointRef.current = { x: e.clientX, y: e.clientY };
      noteDraw();
      canvas.setPointerCapture(e.pointerId);
    };

    const pointerMove = (e: PointerEvent) => {
      if (!drawingRef.current || e.pointerType === "touch") return;
      drawLine(e.clientX, e.clientY);
      lastPointRef.current = { x: e.clientX, y: e.clientY };
      noteDraw();
    };

    const pointerUp = (e: PointerEvent) => {
      drawingRef.current = false;
      lastPointRef.current = null;
      if (canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
      }
    };

    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointercancel", pointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerUp);
    };
  }, [dark, onDraw, enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="dissolve-canvas"
      aria-hidden="true"
    />
  );
}
