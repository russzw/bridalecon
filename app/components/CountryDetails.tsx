// app/components/CountryDetails.tsx
"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { MapPin, DollarSign, Info, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Country {
  country: string;
  bride_price_usd: number;
  region: string;
  description: string;
}

interface CountryDetailsProps {
  country: Country | null;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ country }) => {
  return (
    <Card className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {country ? (
        <>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-[hsl(var(--brand-500))]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--text-muted))]">{country.region}</span>
              </div>
              <CardTitle className="text-3xl font-serif">{country.country}</CardTitle>
            </div>
            <Link href={`/countries/${country.country.toLowerCase().replace(/\s+/g, '-')}`}>
              <Badge variant="default" className="cursor-pointer hover:bg-[hsl(var(--brand-500)/0.2)] transition-colors py-1 px-3">
                Full Profile <ArrowUpRight className="w-3 h-3 ml-1" />
              </Badge>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-[hsl(var(--surface-overlay))] p-4 rounded-2xl border border-[hsl(var(--border))]">
                <div className="flex items-center gap-2 text-[hsl(var(--text-muted))] mb-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase">Average Bride Price</span>
                </div>
                <div className="text-3xl font-bold text-[hsl(var(--text-primary))]">
                  ${country.bride_price_usd.toLocaleString()}
                  <span className="text-sm font-normal text-[hsl(var(--text-muted))] ml-2">USD</span>
                </div>
              </div>
              <div className="bg-[hsl(var(--surface-overlay))] p-4 rounded-2xl border border-[hsl(var(--border))]">
                <div className="flex items-center gap-2 text-[hsl(var(--text-muted))] mb-2">
                  <Info className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase">Customary Form</span>
                </div>
                <div className="text-lg font-semibold text-[hsl(var(--text-primary))]">
                  Traditional / Mixed
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--text-muted))]">Cultural Context</h4>
              <p className="text-[hsl(var(--text-secondary))] leading-relaxed">
                {country.description}
              </p>
            </div>
          </CardContent>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-12 text-center opacity-60">
          <div className="w-16 h-16 rounded-full bg-[hsl(var(--surface-overlay))] flex items-center justify-center mb-6">
            <MapPin className="w-8 h-8 text-[hsl(var(--text-muted))]" />
          </div>
          <CardTitle className="text-xl mb-2">Select a Country</CardTitle>
          <p className="text-sm text-[hsl(var(--text-secondary))] max-w-xs">
            Interact with the globe to explore detailed ethnographic data and economic insights for specific regions.
          </p>
        </div>
      )}
    </Card>
  );
};

export default CountryDetails;
