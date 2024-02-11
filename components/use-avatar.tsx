import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = () => {
    const { user } = useUser();
  return (

    <div className="flex gap-x-2 items-center">
    <Avatar className="h-8 w-8">
        <AvatarImage src={user?.imageUrl}/>
        <AvatarFallback>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
        </AvatarFallback>
    </Avatar>
      <span className="font-semibold">You</span>
    </div>
  )
}

export {  UserAvatar };
