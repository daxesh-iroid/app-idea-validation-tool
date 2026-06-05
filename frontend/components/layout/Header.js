'use client';

import Link from 'next/link';

const navLinks = [
  { href: '#why-validation', label: 'Why Validate' },
  { href: '#what-we-check', label: 'What We Check' },
  { href: '#who-should-use', label: 'Who Should Use' },
  { href: '#what-you-get', label: 'What You Get' },
  { href: '#why-iRoid', label: 'Why iRoid' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">iR</span>
            </div>
            <span className="font-semibold text-lg text-slate-900">
              iRoid Solutions
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/validation-tool"
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md shadow-primary/25"
            >
              Validate Your Idea Free
            </Link>
            <Link
              href="/validation-tool"
              className="sm:hidden inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              Start Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
