// app/components/Recommendations.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Sparkles, Lightbulb, AlertCircle } from "lucide-react";
import { Skeleton } from "./ui/Skeleton";

interface RecommendationsProps {
  priceFilter: string;
  regionFilter: string;
  selectedCountry: any;
}

const Recommendations: React.FC<RecommendationsProps> = ({ priceFilter, regionFilter, selectedCountry }) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(
          `/api/recommendations?priceFilter=${priceFilter}&regionFilter=${regionFilter}&selectedCountry=${selectedCountry ? selectedCountry.country : ''}`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        if (data.recommendations) {
          setRecommendations(data.recommendations);
        }
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
        setError(true);
      }
      setLoading(false);
    };

    fetchRecommendations();
  }, [priceFilter, regionFilter, selectedCountry]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[hsl(var(--brand-500)/0.1)] flex items-center justify-center text-[hsl(var(--brand-500))]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-[hsl(var(--text-primary))]">AI Recommendations</h2>
          <p className="text-sm text-[hsl(var(--text-muted))]">Contextual insights powered by Gemini AI</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-48 flex flex-col justify-between p-6">
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
              <div className="mt-auto">
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="border-red-500/20 bg-red-500/5 p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4 opacity-50" />
          <CardTitle className="text-lg text-red-600 mb-2">Unable to load insights</CardTitle>
          <p className="text-sm text-red-500/80">There was a problem connecting to the AI engine. Please try again later.</p>
        </Card>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <Card key={index} className="h-full hover:border-[hsl(var(--brand-500)/0.4)] transition-all group">
              <CardContent className="h-full flex flex-col p-6">
                <div className="w-8 h-8 rounded-lg bg-[hsl(var(--surface-overlay))] flex items-center justify-center mb-6 group-hover:bg-[hsl(var(--brand-500)/0.1)] transition-colors">
                  <Lightbulb className="w-4 h-4 text-[hsl(var(--text-muted))] group-hover:text-[hsl(var(--brand-500))]" />
                </div>
                <p className="text-[hsl(var(--text-secondary))] text-sm leading-relaxed mb-4">
                  {rec}
                </p>
                <div className="mt-auto pt-4 border-t border-[hsl(var(--border))]">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--text-muted))]">Insight #{index + 1}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center opacity-60">
          <p className="text-sm text-[hsl(var(--text-muted))]">No insights available for current selection.</p>
        </Card>
      )}
    </div>
  );
};

export default Recommendations;
