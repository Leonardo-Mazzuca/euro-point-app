import { View, Text, Image } from "react-native";
import React from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { useProductsContext } from "@/context/products-context";
import { Button } from "../Button";

const ProductCard = ({
  product,
  currentPoints,
}: {
  product: Product;
  currentPoints: number;
}) => {

  const {onAddToBag, productsOnBag} = useProductsContext();

  const disabled = productsOnBag.includes(product) 
  // || currentPoints < product.points;

  return (
    <View
      style={{
        elevation: 5,
      }}
      className="flex-row rounded-xl bg-gray-100 dark:bg-zinc-800 gap-1 items-center"
    >
      <Image
        source={{ uri: product.image }}
        className="w-[140px] h-[140px] rounded-xl rounded-tr-none rounded-br-none "
      />
      <View className="flex-1 p-2">
        <Text className="dark:text-white text-black text-lg font-semibold">
          {product.title}
        </Text>
        <Text className="dark:text-zinc-300 text-zinc-500" numberOfLines={4}>
          {product.description}
        </Text>
        <View className="mt-3 flex-row items-center">
          <Text className="dark:text-white text-black font-medium">
            {product.points} Pontos
          </Text>
          <Button
            disabled={disabled}
            className="ms-auto"
            size={"icon"}
            onPress={() => onAddToBag(product)}
          >
            <AntDesign
              name="plus"
              size={24}
              color={Colors.light.primaryYeallow}
            />
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
