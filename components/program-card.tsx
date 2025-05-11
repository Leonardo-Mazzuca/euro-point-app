import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Card } from "@/components/Card";

type ProgramCardProps = {
  // program:Program
};

const ProgramCard = ({}: ProgramCardProps) => {
  return (
    <Card
    >
      <TouchableOpacity className="items-center p-3 gap-5 flex-row">
        <Image
          className="w-[150px] h-[150px] rounded-2xl"
          source={{
            uri: "https://marcaspelomundo.com.br/wp-content/uploads/2025/01/IMG_7660-e1738353337221-875x1024.jpeg",
          }}
        />
        <View>
          <View className="gap-2">
            <Text className="font-bold text-2xl">CLIC</Text>
            <Text className="font-normal dark:text-gray-300 text-gray-500">
              Descrição do programa
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default ProgramCard;
