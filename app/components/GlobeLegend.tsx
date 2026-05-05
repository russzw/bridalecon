// app/components/GlobeLegend.tsx
"use client";
import React from "react";
import { useTheme } from "next-themes";

const GlobeLegend = () => {
  const { resolvedTheme } = useTheme();

  const legendItems = [
    { label: "Low (< $1k)", color: resolvedTheme === "dark" ? "#E6E6FA" : "#c4b5fd" },
    { label: "Medium ($1k-$5k)", color: resolvedTheme === "dark" ? "#D8BFD8" : "#8b5cf6" },
    { label: "High ($5k-$10k)", color: resolvedTheme === "dark" ? "#8A2BE2" : "#5b21b6" },
    { label: "Max (> $10k)", color: resolvedTheme === "dark" ? "#4B0082" : "#3b0764" },
    { label: "No Data", color: resolvedTheme === "dark" ? "#2d2d3f" : "#e2e8f0" },
  ];

  return (
    <div className="glass p-4 flex flex-col gap-3 min-w-[180px]">
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--text-muted))] mb-1">
        Bride Price (USD)
      </h4>
      <div className="space-y-2">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full border border-[hsl(var(--border))]" 
              style={{ backgroundColor: item.color }} 
            />
            <span className="text-xs font-medium text-[hsl(var(--text-secondary))]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobeLegend;
