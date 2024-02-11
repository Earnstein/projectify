"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "../hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Code,
  ImageIcon,
  MessagesSquare,
  Music,
  VideoIcon,
  Zap,
} from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


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

const tools = [
  {
    label: "Conversation",
    icon: MessagesSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Chart Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
];

const ProModal = () => {
  const promodal = useProModal();
  return (
    <Dialog open={promodal.isOpen} onOpenChange={promodal.onClose}>
      <DialogContent className="max-w-xs sm:max-w-sm w-full mx-auto rounded-md">
        <DialogHeader>
          <DialogTitle
            className="flex justify-center items-center
                flex-col gap-y-4 pb-2"
          >
            <div className={cn("flex items-center gap-x-2 text-2xl font-bold py-1", playfair.className)}>
              Upgrade to Projectify
              <Badge
                variant="premium"
                className="uppercase text-sm py-1 px-2 sm:px-4"
              >
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription
            className="text-center pt-2 space-y-2
                text-zinc-900 font-medium"
          >
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
          onClick={() => {toast.info("Pro version is currently not available")}}
          className={cn("w-full text-sm", palanquin.className)} variant="premium" size="lg">
            upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
