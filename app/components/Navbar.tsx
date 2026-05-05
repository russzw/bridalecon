"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?search=${searchTerm}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--surface)/0.8)] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-brand-500">
                <Image 
                  src="/logo.png" 
                  alt="BridalEcon Logo" 
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-serif font-bold text-[hsl(var(--text-primary))]">
                Bridal<span className="text-[hsl(var(--brand-500))]">Econ</span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--brand-500))] transition-colors">
                Explore
              </Link>
              <Link href="/countries" className="text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--brand-500))] transition-colors">
                Countries
              </Link>
              <Link href="/about" className="text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--brand-500))] transition-colors">
                About
              </Link>
            </div>
          </div>

          {/* Right: Search & Theme */}
          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--text-muted))]" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 text-sm bg-[hsl(var(--surface-overlay))] border border-[hsl(var(--border))] rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-500)/0.4)] transition-all"
              />
            </form>
            <div className="w-px h-6 bg-[hsl(var(--border))]" />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-lg font-medium px-4 py-2 hover:bg-[hsl(var(--surface-overlay))] rounded-lg" onClick={() => setIsMenuOpen(false)}>
              Explore
            </Link>
            <Link href="/countries" className="text-lg font-medium px-4 py-2 hover:bg-[hsl(var(--surface-overlay))] rounded-lg" onClick={() => setIsMenuOpen(false)}>
              Countries
            </Link>
            <Link href="/about" className="text-lg font-medium px-4 py-2 hover:bg-[hsl(var(--surface-overlay))] rounded-lg" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <form onSubmit={handleSearch} className="relative px-4 pt-2">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--text-muted))]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[hsl(var(--surface-overlay))] border border-[hsl(var(--border))] rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-500)/0.4)]"
              />
            </form>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
