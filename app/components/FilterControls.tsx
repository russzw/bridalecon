// app/components/FilterControls.tsx
"use client";
import React from "react";

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
    <div className="flex flex-row gap-2 p-2 mb-8 rounded-lg bg-purple-900 shadow-lg">
      <select
        id="region-filter"
        value={regionFilter}
        onChange={(e) => setRegionFilter(e.target.value)}
        className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
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
        className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
      >
        <option value="">All Prices</option>
        <option value="low">Low ( &lt; $1,000)</option>
        <option value="medium">Medium ($1,000 - $5,000)</option>
        <option value="high">High ( &gt; $5,000)</option>
      </select>
    </div>
  );
};

export default FilterControls;
