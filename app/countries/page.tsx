// app/countries/page.tsx
"use client";

import { useState, useMemo } from "react";
import bridePriceData from "../data/bride-price-data.json";
import GoBackButton from "../components/GoBackButton";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Search, MapPin, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

const CountriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  const filteredCountries = useMemo(() => {
    return bridePriceData.filter((country) => {
      const matchesSearch = country.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = !regionFilter || country.region === regionFilter;
      return matchesSearch && matchesRegion;
    });
  }, [searchTerm, regionFilter]);

  const regions = Array.from(new Set(bridePriceData.map((c) => c.region)));

  return (
    <div className="section min-h-screen">
      <GoBackButton />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-display-md font-serif font-bold text-[hsl(var(--text-primary))] mb-2">
            Global Archive
          </h1>
          <p className="text-[hsl(var(--text-secondary))]">
            Browse our complete database of bride price customs and economic data.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--text-muted))]" />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm bg-[hsl(var(--surface-overlay))] border border-[hsl(var(--border))] rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-500)/0.4)]"
            />
          </div>
          
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="pl-4 pr-10 py-2 text-sm bg-[hsl(var(--surface-overlay))] border border-[hsl(var(--border))] rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-500)/0.4)] appearance-none cursor-pointer"
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCountries.map((country) => (
          <Link 
            key={country.country} 
            href={`/countries/${country.country.toLowerCase().replace(/\s+/g, '-')}`}
            className="group"
          >
            <Card className="h-full hover:border-[hsl(var(--brand-500)/0.4)] transition-all group-hover:-translate-y-1 group-hover:shadow-glow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="neutral" className="text-[10px] uppercase tracking-widest">
                    {country.region}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-[hsl(var(--text-muted))] group-hover:text-[hsl(var(--brand-500))] transition-colors" />
                </div>
                <CardTitle className="text-xl group-hover:text-[hsl(var(--brand-500))] transition-colors">
                  {country.country}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4 text-[hsl(var(--text-primary))] font-bold">
                  <DollarSign className="w-4 h-4 text-[hsl(var(--brand-500))]" />
                  <span>${country.bride_price_usd.toLocaleString()}</span>
                  <span className="text-xs font-normal text-[hsl(var(--text-muted))]">avg.</span>
                </div>
                <p className="text-sm text-[hsl(var(--text-secondary))] line-clamp-3 leading-relaxed">
                  {country.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <div className="py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-[hsl(var(--surface-overlay))] flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-[hsl(var(--text-muted))]" />
          </div>
          <h3 className="text-xl font-bold mb-2">No countries found</h3>
          <p className="text-[hsl(var(--text-secondary))]">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default CountriesPage;
