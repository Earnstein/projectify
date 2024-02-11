"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import { Playfair, Palanquin } from "next/font/google";
import { cn } from "@/lib/utils";

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

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-20 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1 className={cn(playfair.className)}>The Best AI Tool for</h1>
        <div className={cn("text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600", playfair.className )}>
          <TypewriterComponent
            options={{
              strings: [
                "Project Management.",
                "Project insights.",
                "Code Generation."
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <p className={cn("text-sm md:text-xl font-light text-zinc-400", palanquin.className)}>
        Make your work 10x faster with our AI models.
      </p>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premium" className={cn("md:text-lg p-4 md:p-6 rounded-full font-semibold", palanquin.className)}>
            Get Started For Free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
    </div>
  );
};