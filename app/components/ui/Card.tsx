import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 pb-0 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-lg font-semibold text-[hsl(var(--text-primary))] ${className}`}>{children}</h3>;
}

export const CardContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = "" }, ref) => {
    return (
      <div ref={ref} className={`p-6 ${className}`}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";
