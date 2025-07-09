import { Text, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { cn } from "@/lib/utils";
import { useLayoutContext } from "@/context/layout-context";
import { getNameInitials } from "@/util";

type ProfileAvatarProps = {
  horientation?: "row" | "column";
};

const ProfileAvatar = ({ horientation = "row" }: ProfileAvatarProps) => {

  const {currentUser} = useLayoutContext();
  
  return (
    <View
      className={cn(
        "my-5 gap-2 items-center",
        horientation === "row" ? "flex-row" : "flex-col justify-center"
      )}
    >
      <View className="relative">
        <View
          style={{ borderRadius: 100 }}
          className="bg-green-400 h-4 w-4 absolute right-5 bottom-0 z-50"
        />
        <Avatar className="h-[100px] w-[100px]" alt="User image">
          <AvatarImage
            source={{
              uri: currentUser.avatar,
            }}
          />
          <AvatarFallback>
            <Text className="dark:text-white font-semibold text-2xl">{getNameInitials(currentUser?.username)}</Text>
          </AvatarFallback>
        </Avatar>
      </View>
      <View
        className={cn(
          horientation === "row" ? "" : "items-center justify-center"
        )}
      >
        <Text className="font-semibold dark:text-gray-200 text-2xl">
          {currentUser?.username}
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 text-lg">
          Setor: {currentUser?.area?.name}
        </Text>
      </View>
    </View>
  );
};

export default ProfileAvatar;
