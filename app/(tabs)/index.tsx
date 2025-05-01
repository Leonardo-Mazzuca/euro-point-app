import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs";
import { Input } from "@/components/Input";
import AntDesign from "@expo/vector-icons/AntDesign";
import PostCard from "@/components/post-card";
import { cn } from "@/lib/utils";

const Home = () => {
  const [currentScreen, setCurrentScreen] = useState<HomeScreen>("for-you");
  const uiOpacity = useRef(new Animated.Value(1)).current;
  const [hideUI, setHideUI] = useState(false);

  const fadeUI = (toValue: number) => {
    if (toValue === 1) setHideUI(false);

    Animated.timing(uiOpacity, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (toValue === 0) setHideUI(true);
    });
  };


  return (
    <SafeAreaView className="flex-1">
      <View className="px-6 pt-4">
        <Header />

        <Tabs value={currentScreen} onValueChange={(e) => setCurrentScreen(e as HomeScreen)}>
          <TabsList className="flex-row w-full my-2">
            <TabsTrigger value="for-you" className="flex-1">
              <Text className={cn("text-xl", currentScreen === "for-you" && "text-blue-500")}>
                Para você
              </Text>
            </TabsTrigger>
            <TabsTrigger value="following" className="flex-1">
              <Text className={cn("text-xl", currentScreen === "following" && "text-blue-500")}>
                Seguindo
              </Text>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Input
          className="my-4 rounded-2xl"
          placeholder="Busque uma postagem..."
          suffixIcon={<AntDesign name="search1" size={24} color="grey" />}
        />
      </View>

      <View className="flex-1 px-6">
        {currentScreen === "for-you" && (
          <FlatList
            data={Array.from({ length: 5 })}
            renderItem={() => <PostCard />}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={{ gap: 8 }}
          />
        )}

        {currentScreen === "following" && (
          <FlatList
            data={Array.from({ length: 3 })}
            renderItem={() => <PostCard />}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={{ gap: 8 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
