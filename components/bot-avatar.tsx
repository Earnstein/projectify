import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Name {
  name: string
}

const BotAvatar = ({name} :Name) => {
  return (
    <div className="flex gap-x-2 items-center">
      <Avatar className="h-8 w-8">
        <AvatarImage className="p-1" src="/logo.png"/>
    </Avatar>

      <span className="font-semibold">{name}</span>
    </div>

  )
}

export { BotAvatar };