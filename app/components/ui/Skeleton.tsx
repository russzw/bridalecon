import React from "react";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[hsl(var(--surface-overlay))] ${className}`}
    />
  );
}
