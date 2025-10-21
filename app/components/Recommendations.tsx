
// app/components/Recommendations.tsx
"use client";
import React, { useState, useEffect } from "react";

interface RecommendationsProps {
  priceFilter: string;
  regionFilter: string;
}

const Recommendations: React.FC<RecommendationsProps> = ({ priceFilter, regionFilter }) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/recommendations?priceFilter=${priceFilter}&regionFilter=${regionFilter}`
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
  }, [priceFilter, regionFilter]);

  return (
    <div className="mt-8 p-6 rounded-lg bg-gray-800 shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400 font-serif underline">AI-Powered Recommendations</h2>
      {loading ? (
        <p className="text-gray-400 font-sans">Loading recommendations...</p>
      ) : recommendations.length > 0 ? (
        <ul className="space-y-4">
          {recommendations.map((rec, index) => (
            <li key={index} className="bg-gray-700 p-4 rounded-lg shadow-md">
              <p className="text-gray-300 font-sans leading-relaxed">{rec}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 font-sans">No recommendations available for the current filters.</p>
      )}
    </div>
  );
};

export default Recommendations;
