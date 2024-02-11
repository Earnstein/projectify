"use client"
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, ImageIcon, MessagesSquare, Music, VideoIcon } from "lucide-react";
import { Playfair, Palanquin } from "next/font/google";
import { useRouter } from "next/navigation";

const playfair = Playfair({
  weight: "600",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false
});

const palanquin = Palanquin({
  weight: "300",
  subsets: ["latin"],
});

const tools = [
 
  {
    label: "Conversation",
    icon: MessagesSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",

  },
  {
    label: "Chart Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  }
]

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-3 flex flex-col items-center justify-center">
        <h2
          className={cn(
            "text-2xl md:text-4xl font-bold text-center max-w-[500px] w-full",
            playfair.className
          )}
        >
          Elevate Project Delivery with AI
        </h2>
        <p className={cn("text-muted-foreground text-sm md:text-lg text-center", palanquin.className)}>
          Empower engineers with AI insights, optimal methods, and templates for
          seamless project delivery.
        </p>
      </div>

      <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {
            tools.map((tool) => (
              <Card
              onClick={() => router.push(tool.href)}
              key={tool.href}
              className="p-4 border-black/5 flex items-center justify-between
              hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("w-8 h-8", tool.color)}/>
                  </div>
                  <div className="font-semibold text-sm sm:text-lg">
                      {tool.label}
                  </div>
                </div>

                <ArrowRight className="w-4 h-4"/>
              </Card>
            ))
          }
      </div>
    </div>
  );
};

export default DashboardPage;
