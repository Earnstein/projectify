import Image from "next/image";


const Loader = () => {
  return (
    <div className="h-full flex  space-x-4 items-center
    ">
      <div className="w-8 h-8 relative animate-spin">
        <Image
        src="/logo.png"
        fill
        alt="logo"
        />
      </div>

      <div className="text-sm text-muted-foreground">
          Earnstein is thinking...
      </div>
    </div>
  )
}

export { Loader } ;