import { View, Text } from "react-native";
import React from "react";
import { useLayoutContext } from "@/context/layout-context";

const Points = () => {
  const { currentUser } = useLayoutContext();
  return (
    <View className="bg-green-500/25 rounded-xl ms-2 px-2">
      <Text className="text-green-500 text-xl font-semibold">
        {currentUser.total_points}
      </Text>
    </View>
  );
};

export default Points;
