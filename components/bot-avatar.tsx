import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BotAvatar = () => {
  return (
    <div className="flex gap-x-2 items-center">
      <Avatar className="h-8 w-8">
        <AvatarImage className="p-1" src="/logo.png"/>
    </Avatar>

      <span className="font-semibold">Earnstein</span>
    </div>

  )
}

export { BotAvatar };