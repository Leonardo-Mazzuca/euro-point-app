import { Text, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { cn } from "@/lib/utils";


type ProfileAvatarProps = {
    horientation?: "row" | "column";
}

const ProfileAvatar = ({horientation = "row"}: ProfileAvatarProps) => (
    <View className={cn("my-5 gap-2 items-center" , horientation === "row" ? "flex-row" : "flex-col justify-center")}>
      <View className="relative">
        <View 
          style={{borderRadius: 100}}
          className="bg-green-400 h-4 w-4 absolute right-5 bottom-0 z-50"
        />
        <Avatar className="h-[100px] w-[100px]" alt="User image">
          <AvatarImage
            source={{
              uri: "https://avatars.githubusercontent.com/u/66306912?v=4",
            }}
          />
          <AvatarFallback>
            <Text>LM</Text>
          </AvatarFallback>
        </Avatar>
      </View>
      <View className={cn(horientation === "row" ? "" : "items-center justify-center")}>
          <Text className="font-semibold dark:text-gray-200 text-2xl">
              Leonardo Mazzuca
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-lg">
              TI Projetos
          </Text>
      </View>
    </View>
  );

export default ProfileAvatar