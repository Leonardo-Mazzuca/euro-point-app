import { View, Text, Image } from "react-native";
import React from "react";


const BagCard = ({ product }: { product: Product }) => {

  return (
    <View
      style={{
        elevation: 5,
      }}
      className="flex-row rounded-xl bg-gray-100 dark:bg-zinc-800 gap-1"
    >
      <Image
        source={{ uri: product.image }}
        className="w-[140px] h-[120px] rounded-xl rounded-tr-none rounded-br-none "
      />
      <View className="flex-1 p-2">
        <View className="gap-2">
          <Text className="dark:text-white text-black text-lg font-semibold">
            {product.title}
          </Text>
          <Text className="font-medium me-2 dark:text-white text-black">
            Pontos {product.points}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BagCard;
