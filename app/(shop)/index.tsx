import { FlatList, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "@/components/profile-header";
import { Button } from "@/components/Button";
import { AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useLayoutContext } from "@/context/layout-context";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import SearchInput from "@/components/search-input";
import CategoriesScroll from "@/components/categories-scroll";
import Ionicons from "@expo/vector-icons/Ionicons";
import DropDown from "@/components/dropdown";
import { products } from "@/constants/data";

import { useProductsContext } from "@/context/products-context";
import ProductCard from "@/components/shop/product-card";

const Shop = () => {
  const { theme } = useLayoutContext();

  const isDark = theme === "dark";
  const iconColor = isDark
    ? Colors.light.primaryYeallow
    : Colors.light.primaryBlue;
  const [showSearch, setShowSearch] = useState(false);
  const [filteredItem, setFilteredItem] = useState<string>("");
  const { currentUser } = useLayoutContext();

  const filterOptions: Option[] = [
    { value: "all", label: "Todas" },
    { value: "low-points", label: "Menos Pontos" },
    { value: "high-points", label: "Mais Pontos" },
  ];

  const categories = [
    "Todas",
    "Tech",
    "Garrafas",
    "Fitness",
    "Acessórios",
    "Viagens",
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const { productsOnBag } = useProductsContext();

  const totalProductsOnBag = productsOnBag.length;

  return (
    <SafeAreaView className="flex-1 dark:bg-dark-primary bg-white py-4 px-8">
      <ProfileHeader
        rightChild={
          <View>
            <View className="flex-row items-center gap-2">
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
              <View className="relative">
                <Button onPress={() => router.push("/bag")} variant={"ghost"}>
                  <Feather name="shopping-bag" size={24} color={iconColor} />
                </Button>
                {totalProductsOnBag > 0 && (
                  <View className="bg-blue-primary absolute -right-2 -top-1 text-center rounded-full h-[20px] w-[20px] text-white">
                    <Text className="text-center font-semibold dark:text-yeallow-primary text-white">{productsOnBag.length}</Text>
                  </View> 
                )}
              </View>
            </View>
          </View>
        }
        text="Produtos"
      />
      {showSearch && (
        <View className="flex-row my-4 items-center gap-2">
          <SearchInput wrapperClasses="mt-0" placeholder="Buscar um produto" />
        </View>
      )}

      <View
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        className="mt-2"
      >
        <CategoriesScroll
          categories={categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        <Button
          variant={"ghost"}
          className="flex-row items-center gap-2 me-auto px-2"
        >
          <Ionicons
            name="filter"
            size={24}
            color={isDark ? "white" : "black"}
          />
          <DropDown
            onChange={setFilteredItem}
            //@ts-ignore
            data={filterOptions}
            value={filteredItem}
            //@ts-ignore
            labelField="label"
            //@ts-ignore
            valueField="value"
            placeholder="filtros"
            variant="ghost"
            showIcon={false}
          />
        </Button>
      </View>

      <View className="flex-1">
        <View className="flex-row items-center mb-3 gap-2">
          <Text className="dark:text-white text-black font-semibold text-2xl">
            Meus pontos
          </Text>
          <Text className="text-emerald-400 font-semibold text-2xl">
            {currentUser.total_points}
          </Text>
        </View>

        <FlatList
          className="flex-1"
          contentContainerStyle={{ gap: 25 }}
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ProductCard
              currentPoints={currentUser.total_points}
              product={item}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Shop;
