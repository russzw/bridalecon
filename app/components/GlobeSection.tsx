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

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => <Loading />,
});

const GlobeSection = ({ search }: { search: string | null }) => {
  const globeRef = useRef<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [regionFilter, setRegionFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [countriesData, setCountriesData] = useState<any>({ features: [] });
  const [isLoading, setIsLoading] = useState(true);

  const { ref, width = 800, height = 800 } = useResizeObserver<HTMLDivElement>();

  // Load countries
  useEffect(() => {
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

    const featuresWithData = countriesData.features
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

    return featuresWithData;
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
    if (price === 0) return "#4A4A4A";
    const normalizedPrice = price / maxBridePrice;
    if (normalizedPrice <= 0.2) return "#E6E6FA";
    if (normalizedPrice <= 0.5) return "#D8BFD8";
    if (normalizedPrice <= 0.8) return "#8A2BE2";
    return "#4B0082";
  };

  const handleCountryClick = (polygon: any) => {
    setSelectedCountry(polygon.properties);

    // Smoothly center camera on the clicked country
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

  // Set initial point of view
  useEffect(() => {
    if (globeRef.current) {
      const altitude = width < 768 ? 3.5 : 1.8;
      globeRef.current.pointOfView({ lat: 0, lng: 0, altitude }, 1500);
    }
  }, [width]);

  return (
    <section className="p-4 bg-black text-lilac-200 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-400">
          Bridal Economics Explorer
        </h1>

        <div className="flex flex-col items-center gap-12 mb-12">
          <FilterControls
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            regionFilter={regionFilter}
            setRegionFilter={setRegionFilter}
          />

          <div
            className="w-full h-auto aspect-square max-w-full max-h-[700px] rounded-lg overflow-hidden shadow-2xl bg-gray-900"
            ref={ref}
          >
            {isLoading ? (
              <Loading />
            ) : (
              <Globe
                ref={globeRef}
                width={width}
                height={height}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundColor="rgba(0,0,0,0)"
                polygonsData={filteredData}
                polygonAltitude={0.06}
                polygonCapColor={(d: any) => getColorByPrice(d.properties.bride_price_usd)}
                polygonSideColor={() => "rgba(138, 43, 226, 0.15)"}
                polygonStrokeColor={() => "#111"}
                onPolygonClick={handleCountryClick}
                polygonLabel={({ properties }: any) =>
                  `<b class='text-purple-400'>${properties.country}</b><br />Bride Price: <i>$${properties.bride_price_usd}</i>`
                }
              />
            )}
          </div>

          <CountryDetails country={selectedCountry} />
        </div>

        <div className="mb-12">
          <Recommendations
            priceFilter={priceFilter}
            regionFilter={regionFilter}
            selectedCountry={selectedCountry}
          />
        </div>

        <Contributions />
      </div>
    </section>
  );
};

export default GlobeSection;
