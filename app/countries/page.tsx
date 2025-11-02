
// app/countries/page.tsx

import bridePriceData from "../data/bride-price-data.json";
import GoBackButton from "../components/GoBackButton";

const CountriesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <GoBackButton />
      <h1>All Countries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bridePriceData.map((country) => (
          <div key={country.country} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-yellow-400/50 transition-shadow duration-300">
            <h2>{country.country}</h2>
            <p>Region: {country.region}</p>
            <p>Bride Price: ${country.bride_price_usd.toLocaleString()}</p>
            <p className="text-sm text-gray-400">{country.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountriesPage;
