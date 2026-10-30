"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, User } from "lucide-react";
import { cn } from "cn";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations", active: false },
  { label: "My Bookings", href: "/my-bookings", active: false },
  { label: "Admin", href: "/admin", active: false },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="relative z-10 bg-white">
      <nav className="relative flex h-12 items-center justify-between px-7">
        <div className="flex items-center gap-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex cursor-pointer items-center justify-center md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" strokeWidth={2} />
            </SheetTrigger>
            <SheetContent side="left" className="w-72 gap-0 p-0">
              <SheetHeader className="border-b border-border px-5 py-4">
                <SheetTitle className="text-lg font-bold tracking-tight text-[#0aa3bd]">
                  DreamPlace
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Main menu" className="flex flex-col gap-1 px-5 py-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={close}
                    className={cn(
                      "rounded-md px-2 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-muted",
                      link.active &&
                        "text-[#0aa3bd] underline underline-offset-4"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-1 border-t border-border px-5 py-4">
                <Link
                  href="/profile"
                  onClick={close}
                  className="flex items-center gap-1.5 rounded-md px-2 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-muted"
                >
                  <User className="size-4" strokeWidth={2} />
                  Profile
                </Link>
                <Link
                  href="/login"
                  onClick={close}
                  className="rounded-md px-2 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-muted"
                >
                  Login
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          <ul className="hidden items-center gap-6 text-sm font-semibold text-neutral-900 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={cn(
                    "hover:text-[#0aa3bd]",
                    link.active &&
                      "text-[#0aa3bd] underline underline-offset-4"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-xl font-bold tracking-tight text-[#0aa3bd]"
        >
          DreamPlace
        </Link>

        <div className="flex items-center gap-6 text-sm font-semibold text-neutral-900">
          <Link
            href="/profile"
            className="hidden items-center gap-1.5 hover:text-[#0aa3bd] md:flex"
          >
            <User className="size-4" strokeWidth={2} />
            Profile
          </Link>
          <Link
            href="/login"
            className="hidden hover:text-[#0aa3bd] md:inline"
          >
            Login
          </Link>
          <Link href="/register" className="hover:text-[#0aa3bd]">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
