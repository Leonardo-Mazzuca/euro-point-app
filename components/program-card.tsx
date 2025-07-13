import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Card } from "@/components/Card";

type ProgramCardProps = {
  program:Program
};

const ProgramCard = ({program}: ProgramCardProps) => {
  return (
    <Card
    >
      <TouchableOpacity className="items-center p-3 gap-5 flex-row">
        <Image
          className="w-[150px] h-[150px] rounded-2xl"
          source={{
            uri: program.image,
          }}
        />
        <View>
          <View className="gap-2">
            <Text className="font-bold dark:text-gray-400 text-2xl">{program.title.toUpperCase()}</Text>
            <Text className="font-normal dark:text-gray-300 text-gray-500">
              {program.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default ProgramCard;
