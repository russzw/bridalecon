// app/components/GlobeSection.tsx

'use client'

import { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

const GlobeSection = () => {
  const [countriesData, setCountriesData] = useState<any[]>([]);

  useEffect(() => {
    const sampleData = [
      { country: 'Zimbabwe', bride_price_usd: 1500, region: 'Africa' },
      { country: 'India', bride_price_usd: 3000, region: 'Asia' },
      { country: 'USA', bride_price_usd: 5000, region: 'North America' }
    ];
    setCountriesData(sampleData);
  }, []);

  return (
    <section className="p-4">
      <div className="w-full h-[500px]">
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          polygonsData={countriesData}
          polygonAltitude={0.06}
          polygonCapColor={d => d.bride_price_usd ? '#FFD700' : '#B0E0E6'}
          onPolygonClick={d => console.log(d.country)}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Bridal Price Stats</h2>
        <ul className="list-disc pl-5">
          {countriesData.map((country, index) => (
            <li key={index}>
              <span className="font-bold">{country.country}</span>: 
              ${country.bride_price_usd}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default GlobeSection;
