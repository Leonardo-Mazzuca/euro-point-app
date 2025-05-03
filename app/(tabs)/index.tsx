import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Text,
  View,
} from "react-native";
import Header from "@/components/header";
import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs";
import { Input } from "@/components/Input";
import AntDesign from "@expo/vector-icons/AntDesign";
import PostCard from "@/components/post-card";
import { cn } from "@/lib/utils";
import TabsContainer from "@/components/tabs-container";
import { useLayoutContext } from "@/context/layout-context";

const Home = () => {
  const [currentScreen, setCurrentScreen] = useState<HomeScreen>("for-you");
  const uiOpacity = useRef(new Animated.Value(1)).current;
  const {setHideUI} = useLayoutContext();

  const uiTranslateY = useRef(new Animated.Value(0)).current;
  const currentOffset = useRef(0);

  const ANIMATION_DURATION = 200;
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > currentOffset.current + 10) {
      Animated.timing(uiTranslateY, {
        toValue: -350, 
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
      setTimeout(()=> {
        setHideUI(true);
      },ANIMATION_DURATION);
    }

    if (offsetY < currentOffset.current - 10) {
      Animated.timing(uiTranslateY, {
        toValue: 0, 
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
      setTimeout(()=> {
        setHideUI(false);
      },ANIMATION_DURATION);
    }

    currentOffset.current = offsetY;
  };


  return (
    <TabsContainer>
      <Animated.View 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10, 
        transform: [{ translateY: uiTranslateY }],
        opacity: uiOpacity,
      }}
        className="px-6 pt-4"
      >
        <Tabs value={currentScreen} onValueChange={(e) => setCurrentScreen(e as HomeScreen)}>
        <Header />
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
      </Animated.View>

      <View className="flex-1 px-6">
        {currentScreen === "for-you" && (
          <FlatList
            data={Array.from({ length: 5 })}
            renderItem={() => <PostCard />}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={{  paddingTop: 180, paddingBottom: 100, gap: 8  }}
            onScroll={handleScroll}
            
          />
        )}

        {currentScreen === "following" && (
          <FlatList
            data={Array.from({ length: 3 })}
            renderItem={() => <PostCard />}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={{  paddingTop: 180, paddingBottom: 100, gap: 8  }}
          />
        )}
      </View>
    </TabsContainer>
  );
};

export default Home;
