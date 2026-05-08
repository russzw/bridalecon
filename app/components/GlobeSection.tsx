// app/components/GlobeSection.tsx
"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import useResizeObserver from "use-resize-observer";
import bridePriceData from "../data/bride-price-data.json";
import CountryDetails from "./CountryDetails";
import Recommendations from "./Recommendations";
import Contributions from "./Contributions";
import Loading from "./Loading";
import FilterControls from "./FilterControls";
import GlobeLegend from "./GlobeLegend";
import { useTheme } from "next-themes";
import { Badge } from "./ui/Badge";
import { Globe2, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/Button";

// We'll load the Globe component dynamically in the component to ensure refs work correctly

const GlobeSection = ({ search }: { search: string | null }) => {
  const globeRef = useRef<any>(null);
  const { resolvedTheme } = useTheme();
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [regionFilter, setRegionFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [countriesData, setCountriesData] = useState<any>({ features: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [Globe, setGlobe] = useState<any>(null);
  const hasInitialized = useRef(false);

  const { ref, width = 800, height = 600 } = useResizeObserver<HTMLDivElement>();

  // Load components and data
  useEffect(() => {
    // Dynamically import react-globe.gl
    import("react-globe.gl").then((mod) => {
      setGlobe(() => mod.default);
    });

    fetch(
      "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson"
    )
      .then((res) => res.json())
      .then((countries) => {
        setCountriesData(countries);
        setIsLoading(false);
      });
  }, []);

  const processedData = useMemo(() => {
    if (!countriesData.features.length) return [];

    const countryBridePrice: Record<string, any> = {};
    bridePriceData.forEach((d) => {
      countryBridePrice[d.country] = d;
    });

    return countriesData.features
      .map((feature: any) => {
        const countryData = countryBridePrice[feature.properties.ADMIN];
        if (countryData) {
          const newFeature = JSON.parse(JSON.stringify(feature));
          newFeature.properties = { ...newFeature.properties, ...countryData };
          return newFeature;
        }
        return null;
      })
      .filter(Boolean);
  }, [countriesData]);

  const filteredData = useMemo(() => {
    if (!processedData.length) return [];

    return processedData.filter((d: any) => {
      const searchTermLower = search ? search.toLowerCase() : "";
      const matchesSearch =
        !search ||
        (d.properties.country &&
          d.properties.country.toLowerCase().includes(searchTermLower)) ||
        (d.properties.description &&
          d.properties.description.toLowerCase().includes(searchTermLower));

      const matchesRegion = !regionFilter || d.properties.region === regionFilter;

      const matchesPrice =
        !priceFilter ||
        (priceFilter === "low" &&
          d.properties.bride_price_usd > 0 &&
          d.properties.bride_price_usd <= 1000) ||
        (priceFilter === "medium" &&
          d.properties.bride_price_usd > 1000 &&
          d.properties.bride_price_usd <= 5000) ||
        (priceFilter === "high" && d.properties.bride_price_usd > 5000);

      return matchesSearch && matchesRegion && matchesPrice;
    });
  }, [processedData, search, regionFilter, priceFilter]);

  const maxBridePrice = Math.max(...bridePriceData.map((d) => d.bride_price_usd));

  const getColorByPrice = (price: number) => {
    if (price === 0) return resolvedTheme === "dark" ? "#2d2d3f" : "#e2e8f0";
    
    const normalizedPrice = price / maxBridePrice;
    
    // Theme-aware color scale
    if (resolvedTheme === "dark") {
      if (normalizedPrice <= 0.2) return "#E6E6FA";
      if (normalizedPrice <= 0.5) return "#D8BFD8";
      if (normalizedPrice <= 0.8) return "#8A2BE2";
      return "#4B0082";
    } else {
      if (normalizedPrice <= 0.2) return "#c4b5fd";
      if (normalizedPrice <= 0.5) return "#8b5cf6";
      if (normalizedPrice <= 0.8) return "#5b21b6";
      return "#3b0764";
    }
  };

  const handleCountryClick = (polygon: any) => {
    setSelectedCountry(polygon.properties);

    // Scroll to details section
    setTimeout(() => {
      const detailsSection = document.getElementById("country-details");
      if (detailsSection) {
        detailsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);

    if (globeRef.current && polygon.properties?.latitude && polygon.properties?.longitude) {
      globeRef.current.pointOfView(
        {
          lat: polygon.properties.latitude,
          lng: polygon.properties.longitude,
          altitude: 1.5,
        },
        2000
      );
    }
  };

  useEffect(() => {
    if (globeRef.current && !hasInitialized.current) {
      const altitude = width < 768 ? 2.8 : 1.8;
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude }, 1500);
      hasInitialized.current = true;
    }
  }, [width]);

  const handleZoomIn = () => {
    if (!globeRef.current) return;
    const currentPOV = globeRef.current.pointOfView();
    const currentAltitude = currentPOV?.altitude || 1.8;
    const newAltitude = Math.max(0.1, currentAltitude * 0.7);
    globeRef.current.pointOfView({ altitude: newAltitude }, 400);
  };

  const handleZoomOut = () => {
    if (!globeRef.current) return;
    const currentPOV = globeRef.current.pointOfView();
    const currentAltitude = currentPOV?.altitude || 1.8;
    const newAltitude = Math.min(10, currentAltitude * 1.4);
    globeRef.current.pointOfView({ altitude: newAltitude }, 400);
  };

  return (
    <div className="flex flex-col items-center w-full bg-transparent">
      {/* Hero Header Section */}
      <section className="relative w-full pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--brand-500))] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[hsl(var(--brand-900))] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto">
          <Badge variant="default" className="mb-6 animate-fade-in inline-flex items-center">
            <Globe2 className="w-3 h-3 mr-1" />
            Global Ethnographic Data Explorer
          </Badge>
          
          <h1 className="text-display-lg sm:text-display-xl font-serif font-bold text-[hsl(var(--text-primary))] mb-6 tracking-tight animate-slide-up">
            The Economics of <br className="hidden sm:block" />
            <span className="text-gradient">Bridal Traditions</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[hsl(var(--text-secondary))] mb-10 leading-relaxed animate-slide-up [animation-delay:100ms]">
            Explore the complex world of bride price, lobola, and marriage customs through data-driven visualization and cultural analysis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up [animation-delay:200ms]">
            <FilterControls
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
              regionFilter={regionFilter}
              setRegionFilter={setRegionFilter}
            />
          </div>
        </div>
      </section>

      {/* Interactive Globe Section - The Hero Visual */}
      <div className="w-full relative px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div 
          className="relative w-full aspect-[21/9] sm:aspect-[21/9] min-h-[400px] sm:min-h-[600px] rounded-[2rem] overflow-hidden border border-[hsl(var(--border))] bg-black/20 backdrop-blur-sm shadow-2xl group"
          ref={ref}
        >
          {/* Overlays */}
          <div className="absolute top-8 left-8 z-10 hidden sm:block">
            <GlobeLegend />
          </div>

          <div className="absolute bottom-8 right-8 z-10 flex flex-col gap-2">
            <button 
              onClick={handleZoomIn}
              className="glass p-3 rounded-xl hover:bg-[hsl(var(--brand-500)/0.2)] transition-colors text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--brand-500))]"
              title="Zoom In"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            </button>
            <button 
              onClick={handleZoomOut}
              className="glass p-3 rounded-xl hover:bg-[hsl(var(--brand-500)/0.2)] transition-colors text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--brand-500))]"
              title="Zoom Out"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
            </button>
          </div>

          {!Globe || isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[hsl(var(--surface)/0.5)]">
               <div className="flex flex-col items-center gap-4">
                 <div className="w-12 h-12 border-4 border-[hsl(var(--brand-500))] border-t-transparent rounded-full animate-spin" />
                 <p className="text-[hsl(var(--text-secondary))] font-medium">
                   {!Globe ? "Initializing Engine..." : "Loading World Data..."}
                 </p>
               </div>
            </div>
          ) : (
            <Globe
              ref={globeRef}
              width={width}
              height={height}
              globeImageUrl={resolvedTheme === "dark" 
                ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
                : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              }
              backgroundColor="rgba(0,0,0,0)"
              polygonsData={filteredData}
              polygonAltitude={0.02}
              polygonCapColor={(d: any) => getColorByPrice(d.properties.bride_price_usd)}
              polygonSideColor={() => "rgba(138, 43, 226, 0.15)"}
              polygonStrokeColor={() => (resolvedTheme === "dark" ? "#111" : "#fff")}
              onPolygonClick={handleCountryClick}
              polygonLabel={({ properties }: any) => `
                <div class="glass p-4 rounded-xl text-xs shadow-2xl border border-[hsl(var(--border))] min-w-[200px]">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-2 h-2 rounded-full bg-[hsl(var(--brand-500))] animate-pulse"></div>
                    <b class="text-[hsl(var(--text-primary))] text-sm">${properties.country}</b>
                  </div>
                  <div class="flex flex-col gap-2 text-[hsl(var(--text-secondary))]">
                    <div class="flex justify-between items-center">
                      <span>Region</span>
                      <span class="text-[hsl(var(--text-primary))] font-medium">${properties.region}</span>
                    </div>
                    <div class="flex justify-between items-center pt-2 border-t border-[hsl(var(--border))]">
                      <span>Avg. Bride Price</span>
                      <span class="text-[hsl(var(--brand-500))] font-bold text-base">$${properties.bride_price_usd.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              `}
            />
          )}
        </div>
      </div>

      {/* Country Info Section - Now clearly visible below the globe */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Country Details Card */}
        <div id="country-details" className="scroll-mt-24">
          <CountryDetails country={selectedCountry} />
        </div>

        {/* Recommendations and Contributions */}
        <Recommendations
          priceFilter={priceFilter}
          regionFilter={regionFilter}
          selectedCountry={selectedCountry}
        />
        <Contributions />
      </div>
    </div>
  );
};

export default GlobeSection;
