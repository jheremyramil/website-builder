// components/UserAvatar.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { CircleUserRoundIcon } from "lucide-react";

interface UserAvatarProps {
  userId: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-24 w-24 sm:h-32 sm:w-32",
};

const UserAvatar: React.FC<UserAvatarProps> = ({ userId, size = "md" }) => {
  const avatarSize = sizeClasses[size];

  return (
    <Avatar
      className={`${avatarSize} border-2 border-white shadow-xl rounded-full`}
    >
      <AvatarImage
        src={`https://api.dicebear.com/7.x/identicon/svg?seed=${userId}`}
        className="rounded-full"
      />
      <AvatarFallback>
        <CircleUserRoundIcon
          className={avatarSize + " stroke-current text-gray-400"}
        />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
