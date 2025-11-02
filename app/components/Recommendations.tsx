
// app/components/Recommendations.tsx
"use client";
import React, { useState, useEffect } from "react";

interface RecommendationsProps {
  priceFilter: string;
  regionFilter: string;
  selectedCountry: any;
}

const Recommendations: React.FC<RecommendationsProps> = ({ priceFilter, regionFilter, selectedCountry }) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/recommendations?priceFilter=${priceFilter}&regionFilter=${regionFilter}&selectedCountry=${selectedCountry ? selectedCountry.country : ''}`
        );
        const data = await response.json();
        if (data.recommendations) {
          setRecommendations(data.recommendations);
        }
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      }
      setLoading(false);
    };

    fetchRecommendations();
  }, [priceFilter, regionFilter, selectedCountry]);

  return (
    <div className="mt-8 p-6 rounded-lg bg-purple-900 shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-purple-400 font-serif underline">Key Notes</h2>
      {loading ? (
        <p className="text-lilac-300 font-sans">Loading recommendations...</p>
      ) : recommendations.length > 0 ? (
        <ul className="space-y-4">
          {recommendations.map((rec, index) => (
            <li key={index} className="bg-purple-800 p-4 rounded-lg shadow-md">
              <p className="text-lilac-200 font-sans leading-relaxed break-words">{rec}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lilac-300 font-sans">No recommendations available for the current filters.</p>
      )}
    </div>
  );
};

export default Recommendations;
