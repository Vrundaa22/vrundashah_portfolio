"use client";

import { createContext, useCallback, useContext, useState } from "react";
import ComposeMail from "@/components/outlook-demo/ComposeMail";

type ComposeContextValue = {
  openCompose: () => void;
};

const ComposeContext = createContext<ComposeContextValue | null>(null);

export function useCompose() {
  const ctx = useContext(ComposeContext);
  if (!ctx) throw new Error("useCompose must be used within ComposeProvider");
  return ctx;
}

export function ComposeProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const openCompose = useCallback(() => {
    setOpen(true);
    setMinimized(false);
  }, []);

  const closeCompose = useCallback(() => {
    setOpen(false);
    setMinimized(false);
  }, []);

  return (
    <ComposeContext.Provider value={{ openCompose }}>
      {children}
      {open ? (
        <ComposeMail
          minimized={minimized}
          onMinimize={() => setMinimized(true)}
          onExpand={() => setMinimized(false)}
          onClose={closeCompose}
        />
      ) : null}
    </ComposeContext.Provider>
  );
}
