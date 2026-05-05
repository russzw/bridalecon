// app/components/GoBackButton.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/Button';

const GoBackButton = () => {
  return (
    <Link href="/" className="inline-block mb-8">
      <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
        Back to Home
      </Button>
    </Link>
  );
};

export default GoBackButton;
