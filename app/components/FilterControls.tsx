
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
    <div className="mb-8 p-4 rounded-lg bg-gray-800 shadow-lg">
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Search countries..."
          className="p-2 rounded bg-gray-700 text-white flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-4">
          <select
            className="p-2 rounded bg-gray-700 text-white"
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
            className="p-2 rounded bg-gray-700 text-white"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">All Prices</option>
            <option value="low">Low ($0 - $1000)</option>
            <option value="medium">Medium ($1001 - $5000)</option>
            <option value="high">High ($5000)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
