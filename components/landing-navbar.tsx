"use client";

import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Playfair, Palanquin } from "next/font/google";

const playfair = Playfair({
  weight: "600",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false
});

const palanquin = Palanquin({
  weight: "400",
  subsets: ["latin"],
});
export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image fill alt="Logo" src="/logo.png" />
        </div>
        <h1 className={cn("text-2xl md:text-3xl font-bold text-white", playfair.className)}>
          Projectify
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
      <Link href={ "/sign-up"}>
          <Button className={cn("px-4 md:px-6 py-2 rounded-full font-semibold", palanquin.className)}>
            Sign In
          </Button>
        </Link>
      <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premium" className={cn("px-4 md:px-6 py-2 rounded-full font-semibold", palanquin.className)}>
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  )
}