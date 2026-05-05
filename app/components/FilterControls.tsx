// app/components/FilterControls.tsx
"use client";
import React from "react";
import { Filter } from "lucide-react";

interface FilterControlsProps {
  priceFilter: string;
  regionFilter: string;
  setPriceFilter: (value: string) => void;
  setRegionFilter: (value: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  priceFilter,
  regionFilter,
  setPriceFilter,
  setRegionFilter,
}) => {
  return (
    <div className="glass p-2 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl">
      <div className="flex items-center gap-2 px-3 text-[hsl(var(--text-muted))] shrink-0">
        <Filter className="w-4 h-4" />
        <span className="text-xs font-semibold uppercase tracking-wider">Filter By</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 w-full">
        <select
          id="region-filter"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="bg-[hsl(var(--surface-overlay))] border border-[hsl(var(--border))] text-[hsl(var(--text-primary))] text-sm rounded-xl focus:ring-2 focus:ring-[hsl(var(--brand-500)/0.4)] focus:outline-none block w-full p-2.5 transition-all appearance-none cursor-pointer hover:bg-[hsl(var(--surface-elevated))]"
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        
        <select
          id="price-filter"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="bg-[hsl(var(--surface-overlay))] border border-[hsl(var(--border))] text-[hsl(var(--text-primary))] text-sm rounded-xl focus:ring-2 focus:ring-[hsl(var(--brand-500)/0.4)] focus:outline-none block w-full p-2.5 transition-all appearance-none cursor-pointer hover:bg-[hsl(var(--surface-elevated))]"
        >
          <option value="">All Prices</option>
          <option value="low">Low (&lt; $1k)</option>
          <option value="medium">Medium ($1k - $5k)</option>
          <option value="high">High (&gt; $5k)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterControls;
