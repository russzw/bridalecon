// app/components/GoBackButton.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const GoBackButton = () => {
  return (
    <Link href="/" className="inline-flex items-center text-yellow-400 hover:text-yellow-500 transition-colors mb-8">
      <ArrowLeft className="mr-2" />
      Back to Home
    </Link>
  );
};

export default GoBackButton;
