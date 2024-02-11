import { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { Playfair} from "next/font/google";

const playfair = Playfair({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false
});

interface HeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

const Header = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeaderProps) => {
  return (
    <div className="px-4 lg:px-8 flex item-center space-x-3 mb-8">
      <div className={cn("p-2 w-fit rounded-md grid place-content-center", bgColor)}>
        <Icon className={cn("w-6 h-6 md:w-10 md:h-10", iconColor)} />
      </div>

      <div>
        <h2 className={cn("text-3xl", playfair.className)}>{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Header;
