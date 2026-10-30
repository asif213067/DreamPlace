import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Profile", href: "/profile" },
];

const SUPPORT_LINKS = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function LogoLinkedin({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

function LogoInstagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="flex flex-col gap-10 bg-black px-6 pt-16 pb-6 sm:gap-14 md:px-16">
      <div>
        <p className="font-serif text-4xl font-bold text-white sm:text-5xl md:text-[64px] md:leading-none">
          DreamPlace
        </p>
        <p className="mt-2 text-sm text-neutral-400">
          Your gateway to extraordinary travel experiences around the world.
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <h3 className="text-[13px] font-medium tracking-wider text-neutral-200 uppercase">
            Newsletter
          </h3>
          <p className="mt-2 text-xs text-neutral-500">
            Subscribe for exclusive travel deals and inspiration.
          </p>
          <form className="relative mt-4 flex w-full sm:max-w-58">
            <input
              type="email"
              placeholder="Enter email"
              className="h-10 w-full bg-neutral-700 px-4 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0aa3bd]"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center bg-neutral-700 text-white hover:text-[#0aa3bd]"
              aria-label="Subscribe"
            >
              <ArrowUpRight className="size-4" />
            </button>
          </form>
        </div>

        <nav aria-label="Quick links">
          <h3 className="text-[13px] font-medium tracking-wider text-neutral-200 uppercase">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-3.5 text-sm text-neutral-400">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Support">
          <h3 className="text-[13px] font-medium tracking-wider text-neutral-200 uppercase">
            Support
          </h3>
          <ul className="mt-4 space-y-3.5 text-sm text-neutral-400">
            {SUPPORT_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[13px] font-medium tracking-wider text-neutral-200 uppercase">
            Contact Us
          </h3>
          <ul className="mt-4 space-y-3.5 text-sm text-neutral-400">
            <li>
              <a href="tel:+17869011622" className="hover:text-white">
                786 901 1622
              </a>
            </li>
            <li>
              <a href="mailto:info@wandarland.com" className="hover:text-white">
                info@dreamplace.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-auto flex flex-col items-center gap-4 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
        {/* Social Links */}
        <div className="order-1 flex items-center justify-center gap-5 text-neutral-300 sm:order-2">
          <a
            href="https://x.com"
            aria-label="X (Twitter)"
            className="hover:text-white"
          >
            <XLogo className="size-4" />
          </a>

          <a
            href="https://linkedin.com"
            aria-label="LinkedIn"
            className="hover:text-white"
          >
            <LogoLinkedin className="size-4" />
          </a>

          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="hover:text-white"
          >
            <LogoInstagram className="size-4" />
          </a>
        </div>

        {/* Copyright */}
        <p className="order-2 text-center sm:order-1">
          &copy; 2026 DreamPlace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
