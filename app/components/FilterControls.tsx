
// app/components/FilterControls.tsx
"use client";
import React from "react";

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  regionFilter: string;
  setRegionFilter: (region: string) => void;
  priceFilter: string;
  setPriceFilter: (price: string) => void;
  allRegions: string[];
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  setSearchTerm,
  regionFilter,
  setRegionFilter,
  priceFilter,
  setPriceFilter,
  allRegions,
}) => {
  return (
    <div className="mb-8 p-4 rounded-lg bg-purple-900 shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search countries..."
          className="p-2 rounded bg-purple-800 text-lilac-200 flex-grow w-full md:w-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-4 w-full md:w-auto">
          <select
            className="p-2 rounded bg-purple-800 text-lilac-200 w-full"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="">All Regions</option>
            {allRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select
            className="p-2 rounded bg-purple-800 text-lilac-200 w-full"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">All Prices</option>
            <option value="low">Low ($0 - $1000)</option>
            <option value="medium">Medium ($1001 - $5000)</option>
            <option value="high">High (+$5000)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
