// app/page.tsx
'use client';

import GlobeSection from './components/GlobeSection';
import { useSearchParams } from 'next/navigation';

const HomePage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  return <GlobeSection search={search} />;
};

export default HomePage;
