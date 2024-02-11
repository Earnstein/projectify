"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_LIMIT } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import {  Playfair } from "next/font/google";
import { cn } from "@/lib/utils";
import { useProModal } from '@/hooks/use-pro-modal';

const playfair = Playfair({
    weight: "600",
    subsets: ["latin"],
    display: "swap",
    adjustFontFallback: false
  });
interface LimitCounterProp {
    apiLimitCount: number;
  }

const LimitCounter = ({apiLimitCount = 0}: LimitCounterProp) => {
    const [mounted, setMounted] = useState(false);
    const promodal = useProModal();

    useEffect(() => {
      setMounted(true);
    }, [])
    
    if (!mounted){
        return null;
    }
  return (
    <div className="px-4">
        <Card className="bg-white/10 border-0">
            <CardContent  className="py-2">
                <div className={cn("text-center text-sm text-white mb-4 space-y-2",playfair.className)}>
                    <p>{apiLimitCount}/{MAX_LIMIT} Free Trials</p>
                    <Progress className="h-3"
                    value={(apiLimitCount / MAX_LIMIT) * 100}
                    />
                    <Button 
                    className="w-full" 
                    variant="premium"
                    onClick={promodal.onOpen}
                    >
                       upgrade <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default LimitCounter;