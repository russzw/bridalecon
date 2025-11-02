
// app/components/CountryDetails.tsx
"use client";
import React from "react";

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
    <div className="p-6 rounded-lg bg-purple-900 shadow-lg h-full">
      {country ? (
        <div>
          <h2 className="text-3xl font-bold mb-4 text-lilac-200 font-serif underline">{country.country}</h2>
          <p className="text-xl mb-4">
            <strong className="font-semibold">Bride Price:</strong> ${country.bride_price_usd.toLocaleString()}
          </p>
          <p className="text-lg mb-4">
            <strong className="font-semibold">Region:</strong> {country.region}
          </p>
          <p className="mt-6 text-lilac-300 leading-relaxed font-sans">{country.description}</p>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 font-serif underline">Country Details</h2>
          <p className="text-lilac-300 font-sans">Click on a country to see more details.</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
