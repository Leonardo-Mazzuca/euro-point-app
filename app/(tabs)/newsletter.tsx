import React, { useRef, useState } from "react";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import { Input } from "@/components/Input";
import { Animated, FlatList } from "react-native";
import CategoriesScroll from "@/components/categories-scroll";
import AntDesign from "@expo/vector-icons/AntDesign";
import NewsLetterCard from "@/components/newsletter-card";
import { useLayoutContext } from "@/context/layout-context";

const Newsletter = () => {
  const categories = ["Para você", "TI", "RH", "Corporativo", "Interno"];
  const [selected, setSelected] = useState(categories[0]);

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
        <Header />
        <CategoriesScroll
          categories={categories}
          selected={selected}
          setSelected={setSelected}
        />
        <Input
          className="my-4 rounded-2xl"
          placeholder="Busque uma postagem..."
          suffixIcon={<AntDesign name="search1" size={24} color="grey" />}
        />
      </Animated.View>
      <FlatList
          data={Array.from({length:10})}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => <NewsLetterCard />}
          contentContainerStyle={{  paddingTop: 180, paddingBottom: 100, gap: 8  }}
          onScroll={handleScroll}
        />
    </TabsContainer>
  );
};

export default Newsletter;
