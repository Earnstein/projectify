import Image from "next/image";

interface Name {
  name: string
}

const Loader = ({name}:Name) => {
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

      <p className="text-sm text-muted-foreground">
          {name}
      </p>
    </div>
  )
}

export { Loader } ;