import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "@/components/profile-header";
import { Button } from "@/components/Button";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useLayoutContext } from "@/context/layout-context";
import { FlatList, Text, View } from "react-native";
import SearchInput from "@/components/search-input";
import { useProductsContext } from "@/context/products-context";
import BagCard from "@/components/shop/bag-card";
import { router } from "expo-router";

const Bag = () => {
  const { theme } = useLayoutContext();



  const isDark = theme === "dark";
  const [showSearch, setShowSearch] = useState(false);
  const iconColor = isDark
    ? Colors.light.primaryYeallow
    : Colors.light.primaryBlue;

  const { productsOnBag, totalPoints } = useProductsContext();


  return (
    <SafeAreaView className="flex-1 dark:bg-dark-primary bg-white py-4 px-8">
      <ProfileHeader
        text="Minha Sacola"
        rightChild={
          <>
            <Button
              onPress={() => setShowSearch(!showSearch)}
              variant={"ghost"}
            >
              {!showSearch ? (
                <AntDesign name="search1" size={24} color={iconColor} />
              ) : (
                <AntDesign name="close" size={24} color={iconColor} />
              )}
            </Button>
          </>
        }
      />
      {showSearch && (
        <View className="flex-row my-4 items-center gap-2">
          <SearchInput
            wrapperClasses="mt-0"
            placeholder="Procurar na sacola..."
          />
        </View>
      )}

      <View className="flex-1 mt-5">
        <FlatList
          data={productsOnBag}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BagCard product={item} />}
          ListEmptyComponent={() => <></>}
          contentContainerStyle={{ gap: 10 }}
        />

        {productsOnBag.length > 0 && (
          <View>
            <View className="flex-row items-center justify-between my-5">
              <Text className="text-zinc-500 dark:text-zinc-300">Total</Text>
              <Text className="text-xl font-semibold dark:text-white">
                {totalPoints} Pontos
              </Text>
            </View>
            <Button onPress={()=>router.push('/order-resume')} className="rounded-xl">
              <Text className="text-white text-lg font-medium">
                Resumo do pedido
              </Text>
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Bag;
