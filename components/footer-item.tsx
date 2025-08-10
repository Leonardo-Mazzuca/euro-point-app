import { Text, View } from "react-native";

type FooterItemProps = {
    icon: React.ReactNode;
    text: string;
};

export const FooterItem = ({ icon, text }: FooterItemProps) => {
    return (
      <View className="items-center flex-row gap-2">
        {icon}
        <Text className="text-gray-600 dark:text-gray-100">{text}</Text>
      </View>
    );
  };