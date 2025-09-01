import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { Button } from "../Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLayoutContext } from "@/context/layout-context";

const BagCard = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  const { theme } = useLayoutContext();
  const isDark = theme === "dark";

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const iconColor = isDark ? "white" : "grey";

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
        <View className="flex-row items-center justify-between">
          <Text className="dark:text-white text-black text-lg font-semibold">
            {product.title}
          </Text>
          <Button>

          </Button>
        </View>
        <View className="flex-row mt-auto items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1">
            <Button
              disabled={quantity === 1}
              onPress={decrease}
              size={"icon"}
              variant={"ghost"}
              className="rounded-full"
              style={{ 
                elevation: 1,
                shadowColor: "#E5E0D8",
                shadowOpacity: 0.08, 
                shadowRadius: 2,
                shadowOffset: { width: 0, height: 1 },
              }}
            >
              <AntDesign name="minus" size={24} color={iconColor} />
            </Button>
            <Text className="dark:text-white text-zinc-700">{quantity}</Text>
            <Button
              onPress={increase}
              size={"icon"}
              variant={"ghost"}
              className="rounded-full"
              style={{ 
                elevation: 1,
                shadowColor: "#E5E0D8",
                shadowOpacity: 0.08, 
                shadowRadius: 2,
                shadowOffset: { width: 0, height: 1 },
              }}
            >
              <AntDesign name="plus" size={24} color={iconColor} />
            </Button>
          </View>
          <Text className="font-medium me-2 dark:text-white text-black">
            Pontos {product.points * quantity}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BagCard;
