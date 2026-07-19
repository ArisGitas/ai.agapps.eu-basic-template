"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "./Container";

const navLinks = [
  { label: "Υπηρεσίες", href: "#services" },
  { label: "Σχετικά", href: "#about" },
  { label: "Επικοινωνία", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header data-section="header" className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-role="logo" className="text-xl font-bold text-gray-900 tracking-tight">
            Η Εταιρεία Μας
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-role="nav-link"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            data-role="contact-button"
            className="hidden md:inline-flex px-4 py-2 text-sm font-semibold bg-[#0070f3] text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Επικοινωνήστε μαζί μας
          </a>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            data-role="menu-toggle"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                data-role="nav-link"
                className="block text-sm font-medium text-gray-600 hover:text-gray-900 py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              data-role="contact-button"
              className="block text-sm font-semibold text-[#0070f3] py-1"
            >
              Επικοινωνήστε μαζί μας →
            </a>
          </div>
        )}
      </Container>
    </header>
  );
}
