import { Colors } from "@/constants/Colors";
import { useLayoutContext } from "@/context/layout-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  text: string;
  rightChild?: React.ReactNode;
}
const ProfileHeader = ({text, rightChild}:Props) => {
  const onPress = () => router.back();
  const { theme } = useLayoutContext();
  return (
    <View className="flex-row items-center gap-2 justify-between">
      <View className="flex-row items-center gap-2">
        <TouchableOpacity onPress={onPress}>
          <Feather
            name="chevron-left"
            size={28}
            color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
          />
        </TouchableOpacity>
        <Text className="text-2xl dark:text-white font-semibold">{text}</Text>
      </View>
      {rightChild}
    </View>
  );
};

export default ProfileHeader;
