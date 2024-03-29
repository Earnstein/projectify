"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessagesSquare, Music, Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import LimitCounter from "@/components/LimitCounter";
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

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessagesSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-yellow-500",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings"
  },
];

interface sidebarProps {
  apiLimitCount: number;
}


const Sidebar = ({apiLimitCount = 0}: sidebarProps) => {
  const pathname = usePathname();


  return (
    <div className="space-y-4 py-4 flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        
        {/* HEADER */}
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill sizes="w-full h-full" alt="logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-xl font-bold", playfair.className)}>
            Projectify
          </h1>
        </Link>

        {/* LINKS */}
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "group text-sm flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                palanquin.className,
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* <LimitCounter
      apiLimitCount={apiLimitCount}
      /> */}
    </div>
  );
};

export default Sidebar;
