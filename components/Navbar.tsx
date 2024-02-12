"use client"
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-nav";
import useMediaQuery from "@/hooks/useMediaQuery";



interface NavbarProps {
  apiLimitCount: number;
}


const Navbar = ({apiLimitCount}:NavbarProps) => {
  const isMobileScreen = useMediaQuery("(min-width: 768px)");
  return (
    <div className="flex item-center p-4">
      {!isMobileScreen &&  <MobileSidebar apiLimitCount={apiLimitCount}/>}
      <div className="flex w-full justify-end">
          <UserButton afterSignOutUrl="/"/>
      </div>
    </div>
  )
}

export default Navbar;