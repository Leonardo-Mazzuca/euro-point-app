import React, { useRef, useState } from "react";
import {
  Animated,
  Text,
  View,
} from "react-native";
import Header from "@/components/header";
import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs";
import PostCard from "@/components/post-card";
import { cn } from "@/lib/utils";
import TabsContainer from "@/components/tabs-container";
import AnimatedView from "@/components/animated-view";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SearchInput from "@/components/search-input";
import ScrollableList from "@/components/scrollable-list";

const Home = () => {
  const [currentScreen, setCurrentScreen] = useState<HomeScreen>("for-you");
  const uiTranslateY = useRef(new Animated.Value(0)).current;
  const {handleScroll,uiOpacity} = useScrollAnimation({translateValue: uiTranslateY});

  return (
    <TabsContainer>
      <AnimatedView
        style={{ opacity: uiOpacity, transform: [{ translateY: uiTranslateY }] }}
      >
        <Tabs value={currentScreen} onValueChange={(e) => setCurrentScreen(e as HomeScreen)}>
        <Header />
          <TabsList className="flex-row w-full my-2">
            <TabsTrigger value="for-you" className="flex-1">
              <Text className={cn("text-xl font-semibold", currentScreen === "for-you" ? "text-blue-500" : "dark:text-white")}>
                Para você
              </Text>
            </TabsTrigger>
            <TabsTrigger value="following" className="flex-1">
              <Text className={cn("text-xl font-semibold", currentScreen === "following" ? "text-blue-500" : "dark:text-white")}>
                Seguindo
              </Text>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <SearchInput />
      </AnimatedView>

      <View className="mt-16 flex-1 px-6">
        {currentScreen === "for-you" && (
          <ScrollableList
            data={Array.from({ length: 5 })}
            renderItem={() => <PostCard />}
            handleScroll={handleScroll}
            
          />
        )}

        {currentScreen === "following" && (
          <ScrollableList
            data={Array.from({ length: 3 })}
            renderItem={() => <PostCard />}
            handleScroll={handleScroll}
          />
        )}
      </View>
    </TabsContainer>
  );
};

export default Home;
