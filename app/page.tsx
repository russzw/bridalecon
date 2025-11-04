// app/page.tsx
'use client';

import GlobeSection from './components/GlobeSection';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const GlobeSearch = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  return <GlobeSection search={search} />;
}

const HomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobeSearch />
    </Suspense>
  );
};

export default HomePage;
