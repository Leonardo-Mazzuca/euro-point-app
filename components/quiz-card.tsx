import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Card } from "@/components/Card";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { AntDesign } from "@expo/vector-icons";

const QuizCard = () => {
  return (
    <TouchableOpacity className="flex-row w-full">
      <Card className="bg-white flex-1 flex-row px-4 gap-3 py-2">
        <Image
          className="w-[70px] h-[70px] rounded-xl"
          source={{
            uri: "https://marcaspelomundo.com.br/wp-content/uploads/2025/01/IMG_7660-e1738353337221-875x1024.jpeg",
          }}
        />
        <View>
          <Text className="text-blue-primary font-semibold text-xl">CLIC</Text>
          <Text className="text-gray-400 text-sm flex-row items-center">
            <AntDesign name="profile" size={12} color="gray" /> 10 Questões
          </Text>
          <Text className="text-gray-400 text-sm flex-row items-center">
            <FontAwesome6 name="clock" size={12} color="grey" /> 20 min
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default QuizCard;
