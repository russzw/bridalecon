// app/page.tsx
'use client';

import GlobeSection from './components/GlobeSection';
import TrendsSection from './components/TrendsSection';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const GlobeSearch = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  return <GlobeSection search={search} />;
}

const HomePage = () => {
  return (
    <div className="flex flex-col w-full">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--surface))]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[hsl(var(--brand-500))] border-t-transparent rounded-full animate-spin" />
            <p className="text-[hsl(var(--text-secondary))] font-medium">Initializing 3D Environment...</p>
          </div>
        </div>
      }>
        <GlobeSearch />
      </Suspense>
      <TrendsSection />
    </div>
  );
};

export default HomePage;
