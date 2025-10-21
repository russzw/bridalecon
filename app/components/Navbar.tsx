
// app/components/Navbar.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-none">
          <h1 className="text-2xl font-extrabold tracking-wide uppercase text-white">
            BEE
          </h1>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-8 text-sm uppercase font-semibold text-white">
            <li>
              <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-yellow-400 transition-colors">About</Link>
            </li>
            <li>
              <Link href="/countries" className="hover:text-yellow-400 transition-colors">Countries</Link>
            </li>
          </ul>
        </div>

        {/* Right: Search */}
        <div className="hidden md:flex items-center space-x-2">
          <Search className="w-5 h-5 text-white" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-white text-sm px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-4 text-sm uppercase font-semibold text-white items-center">
            <li>
              <Link href="/" className="hover:text-yellow-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-yellow-400 transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
            </li>
            <li>
              <Link href="/countries" className="hover:text-yellow-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Countries</Link>
            </li>
          </ul>
          <div className="mt-4 flex items-center space-x-2 justify-center">
            <Search className="w-5 h-5 text-white" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 text-white text-sm px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
