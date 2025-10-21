
// app/components/GlobeSection.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useResizeObserver from "use-resize-observer";
import bridePriceData from "../data/bride-price-data.json";
import CountryDetails from "./CountryDetails";
import FilterControls from "./FilterControls";
import Recommendations from "./Recommendations";
import Contributions from "./Contributions";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const GlobeSection = () => {
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [countriesData, setCountriesData] = useState<any>({ features: [] });

  const { ref, width = 600, height = 600 } = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    // Load countries geojson
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(countries => {
         setCountriesData(countries);
      });
  }, []);


  const processedData = useMemo(() => {
    if (!countriesData.features.length) return [];

    const countryBridePrice: { [key: string]: any } = {};
    bridePriceData.forEach(d => {
      countryBridePrice[d.country] = d;
    });

    const featuresWithData = countriesData.features.map((feature: any) => {
      const countryData = countryBridePrice[feature.properties.ADMIN];
      if (countryData) {
        const newFeature = JSON.parse(JSON.stringify(feature)); // Deep copy to avoid modifying the original data
        newFeature.properties = { ...newFeature.properties, ...countryData };
        return newFeature;
      }
      return null;
    }).filter(Boolean);

    return featuresWithData;
  }, [countriesData]);

  const filteredData = useMemo(() => {
    if (!processedData.length) return [];

    return processedData.filter((d:any) => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch =
        (d.properties.country && d.properties.country.toLowerCase().includes(searchTermLower)) ||
        (d.properties.description && d.properties.description.toLowerCase().includes(searchTermLower));

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
  }, [processedData, searchTerm, regionFilter, priceFilter]);

  const maxBridePrice = Math.max(...bridePriceData.map((d) => d.bride_price_usd));

  const getColorByPrice = (price: number) => {
    if (price === 0) return "grey";
    const normalizedPrice = price / maxBridePrice;
    if (normalizedPrice <= 0.2) return "green";
    if (normalizedPrice <= 0.5) return "yellow";
    if (normalizedPrice <= 0.8) return "orange";
    return "red";
  };

  const handleCountryClick = (polygon: any) => {
    setSelectedCountry(polygon.properties);
  };

  const allRegions = [...new Set(bridePriceData.map((d) => d.region))];

  return (
    <section className="p-4 bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-yellow-300 tracking-wider">Bridal Economics Explorer</h1>

        <div className="mb-12">
          <FilterControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            regionFilter={regionFilter}
            setRegionFilter={setRegionFilter}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            allRegions={allRegions}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="md:col-span-2 h-[500px] md:h-auto rounded-lg overflow-hidden shadow-2xl" ref={ref}>
            <Globe
              width={width}
              height={height}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              polygonsData={filteredData}
              polygonAltitude={0.06}
              polygonCapColor={(d: any) => getColorByPrice(d.properties.bride_price_usd)}
              polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
              polygonStrokeColor={() => "#111"}
              onPolygonClick={handleCountryClick}
              polygonLabel={({ properties }: any) =>
                `<b>${properties.country}</b> <br /> Bride Price: <i>$${properties.bride_price_usd}</i>`
              }
            />
          </div>

          <CountryDetails country={selectedCountry} />
        </div>

        <div className="mb-12">
          <Recommendations priceFilter={priceFilter} regionFilter={regionFilter} />
        </div>

        <Contributions />
      </div>
    </section>
  );
};

export default GlobeSection;
