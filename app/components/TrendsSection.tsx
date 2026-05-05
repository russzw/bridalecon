// app/components/TrendsSection.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { TrendingUp, ArrowUp, ArrowDown, Minus } from "lucide-react";

export default function TrendsSection() {
  const trends = [
    { label: "Urban Bride Prices", value: "+12%", trend: "up", context: "Inflation and rising housing costs in African/Asian cities." },
    { label: "Livestock-to-Cash", value: "85%", trend: "up", context: "Shift towards monetization of traditional lobola/caili." },
    { label: "Age of Marriage", value: "24.5", trend: "up", context: "Delayed marriage due to financial pressure in high-price regions." },
    { label: "Online Negotiations", value: "New", trend: "neutral", context: "Rising trend of digital bride price planning via social apps." }
  ];

  return (
    <section className="py-24 bg-[hsl(var(--surface))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[hsl(var(--text-primary))] mb-4">
              Macro Trends in Bridal Economics
            </h2>
            <p className="text-[hsl(var(--text-secondary))]">
              Analyzing how global shifts in economy, technology, and social values impact traditional marriage customs.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--brand-500)/0.1)] text-[hsl(var(--brand-500))] text-sm font-semibold">
            <TrendingUp className="w-4 h-4" />
            2024-2025 Market Analysis
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trends.map((item, i) => (
            <Card key={i} className="hover:border-[hsl(var(--brand-500)/0.4)] transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--text-muted))]">Trend Index</span>
                  {item.trend === 'up' && <ArrowUp className="w-4 h-4 text-emerald-500" />}
                  {item.trend === 'down' && <ArrowDown className="w-4 h-4 text-red-500" />}
                  {item.trend === 'neutral' && <Minus className="w-4 h-4 text-amber-500" />}
                </div>
                <div className="text-3xl font-bold text-[hsl(var(--text-primary))] mb-1">{item.value}</div>
                <div className="text-sm font-semibold text-[hsl(var(--text-secondary))] mb-3">{item.label}</div>
                <p className="text-xs text-[hsl(var(--text-muted))] leading-relaxed">
                  {item.context}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
