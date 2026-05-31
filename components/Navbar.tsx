"use client";

import Link from 'next/link';
import { useState } from 'react';

// Raw SVGs
const Globe = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
  </svg>
);

const Menu = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Destinations', href: '/countries' },
    { name: 'Study', href: '/study-abroad' },
    { name: 'Work', href: '/work-abroad' },
    { name: 'Tools', href: '/resources/tools' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">VisaSlot</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 ml-4 border-l border-slate-200 pl-6">
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                Log in
              </Link>
              <Link href="/start-here" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                Start Here
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-slate-900 focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-100 px-3 flex flex-col gap-3">
              <Link href="/login" className="block text-center text-base font-medium text-slate-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                Log in
              </Link>
              <Link href="/start-here" className="block text-center text-base font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={() => setIsOpen(false)}>
                Start Here
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
