// app/components/Header.tsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link href="/">Bridal Economics Explorer</Link>
      </h1>
      <nav>
        <Link href="/about" className="mr-4">
          About
        </Link>
      </nav>
    </header>
  );
};

export default Header;
