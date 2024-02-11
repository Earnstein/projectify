"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
})


const testimonials = [
  {
    name: "Faud",
    avatar: "F",
    title: "Project Engineer",
    description: "This is the best application I've ever used!",
  },
  {
    name: "Gbolahan",
    avatar: "F",
    title: "Contractor",
    description: "I use this daily for generating new project templates!",
  },
  {
    name: "Halira",
    avatar: "H",
    title: "Project Manager",
    description: "This app has changed my life, cannot imagine working without it!",
  },
  {
    name: "Mary",
    avatar: "M",
    title: "Consultant",
    description: "The best in class, definitely worth the premium subscription!",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className={cn("flex items-center gap-x-2",  playfair.className)}>
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className={ cn("pt-4 px-0", palanquin.className)}>
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}