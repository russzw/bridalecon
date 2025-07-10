// app/components/Navbar.tsx

'use client';

import Link from 'next/link';
import { Search } from 'lucide-react'; // You can install this icon package or use any

const Navbar = () => {
  return (
    <nav className="bg-black border-b border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-none">
          <h1 className="text-2xl font-extrabold tracking-wide uppercase text-white">
            BEE
          </h1>
        </div>

        {/* Center: Navigation */}
        <div className="flex-1 flex justify-center">
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
        <div className="flex-none flex items-center space-x-2">
          <Search className="w-5 h-5 text-white" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-white text-sm px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
