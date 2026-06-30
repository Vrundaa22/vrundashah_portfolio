"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PdfDeckViewerProps = {
  src: string;
  pageIndex: number;
  onPageChange: (index: number) => void;
  onPageCount: (count: number) => void;
};

export default function PdfDeckViewer({
  src,
  pageIndex,
  onPageChange,
  onPageCount,
}: PdfDeckViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<{ numPages: number; getPage: (n: number) => Promise<unknown> } | null>(
    null
  );
  const renderTaskRef = useRef<{ cancel: () => void } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const renderPage = useCallback(async (index: number) => {
    const pdf = pdfRef.current;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!pdf || !canvas || !wrap) return;

    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    const page = (await pdf.getPage(index + 1)) as {
      getViewport: (opts: { scale: number }) => { width: number; height: number };
      render: (ctx: {
        canvasContext: CanvasRenderingContext2D;
        viewport: { width: number; height: number };
      }) => { promise: Promise<void>; cancel: () => void };
    };

    const maxWidth = wrap.clientWidth || 900;
    const viewport = page.getViewport({ scale: 1 });
    const scale = maxWidth / viewport.width;
    const scaled = page.getViewport({ scale });

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = scaled.width;
    canvas.height = scaled.height;

    const task = page.render({
      canvasContext: context,
      viewport: scaled,
    });
    renderTaskRef.current = task;
    await task.promise;
    renderTaskRef.current = null;
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadPdf() {
      try {
        setLoading(true);
        setError(null);

        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const pdf = await pdfjs.getDocument(src).promise;
        if (cancelled) return;

        pdfRef.current = pdf;
        setTotalPages(pdf.numPages);
        onPageCount(pdf.numPages);
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError("Could not load the deck. Try refreshing the page.");
          setLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      cancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [src, onPageCount]);

  useEffect(() => {
    if (loading || error) return;
    renderPage(pageIndex).catch(() => {
      setError("Could not render this slide.");
    });
  }, [pageIndex, loading, error, renderPage]);

  useEffect(() => {
    const onResize = () => {
      if (!loading && !error) {
        renderPage(pageIndex).catch(() => undefined);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pageIndex, loading, error, renderPage]);

  const goPrev = () => {
    if (pageIndex > 0) onPageChange(pageIndex - 1);
  };

  const goNext = () => {
    const total = pdfRef.current?.numPages ?? 0;
    if (pageIndex < total - 1) onPageChange(pageIndex + 1);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    const end = e.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (start == null || end == null) return;

    const delta = end - start;
    if (Math.abs(delta) < 48) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  return (
    <div
      ref={wrapRef}
      className="pdf-deck"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        className="pdf-deck-nav pdf-deck-nav--prev"
        onClick={goPrev}
        disabled={loading || pageIndex === 0}
        aria-label="Previous slide"
      >
        ←
      </button>

      <div className="pdf-deck-stage">
        {loading && <p className="pdf-deck-status">Loading deck…</p>}
        {error && <p className="pdf-deck-status pdf-deck-status--error">{error}</p>}
        <canvas ref={canvasRef} className="pdf-deck-canvas" aria-hidden={loading || !!error} />
      </div>

      <button
        type="button"
        className="pdf-deck-nav pdf-deck-nav--next"
        onClick={goNext}
        disabled={loading || pageIndex >= totalPages - 1}
        aria-label="Next slide"
      >
        →
      </button>
    </div>
  );
}
