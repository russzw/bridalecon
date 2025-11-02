
// app/components/Navbar.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/?search=${searchTerm}`);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-black border-b border-purple-900 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-none">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="BEE Logo" width={80} height={80} className="w-auto h-auto" />
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-8 text-sm uppercase font-semibold text-lilac-200">
            <li>
              <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-purple-400 transition-colors">About</Link>
            </li>
            <li>
              <Link href="/countries" className="hover:text-purple-400 transition-colors">All Countries</Link>
            </li>
          </ul>
        </div>

        {/* Right: Search */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
          <Search className="w-5 h-5 text-lilac-200" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-purple-900 text-lilac-200 text-sm px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </form>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-lilac-200">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-4 text-sm uppercase font-semibold text-lilac-200 items-center">
            <li>
              <Link href="/" className="hover:text-purple-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-purple-400 transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
            </li>
            <li>
              <Link href="/countries" className="hover:text-purple-400 transition-colors" onClick={() => setIsMenuOpen(false)}>All Countries</Link>
            </li>
          </ul>
          <form onSubmit={handleSearch} className="mt-4 flex items-center space-x-2 justify-center">
            <Search className="w-5 h-5 text-lilac-200" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-purple-900 text-lilac-200 text-sm px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
