import React, { useRef, useState } from "react";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import { Animated, FlatList, View } from "react-native";
import CategoriesScroll from "@/components/categories-scroll";
import NewsLetterCard from "@/components/newsletter-card";
import AnimatedView from "@/components/animated-view";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SearchInput from "@/components/search-input";
import ScrollableList from "@/components/scrollable-list";

const Newsletter = () => {
  const categories = ["Para você", "TI", "RH", "Corporativo", "Interno"];
  const [selected, setSelected] = useState(categories[0]);
  const uiTranslateY = useRef(new Animated.Value(0)).current;
  const {handleScroll,uiOpacity} = useScrollAnimation({translateValue: uiTranslateY});

  return (
    <TabsContainer>
      <AnimatedView 
        style={{ opacity: uiOpacity, transform: [{ translateY: uiTranslateY }] }}
      >
        <Header />
        <CategoriesScroll
          categories={categories}
          selected={selected}
          setSelected={setSelected}
        />
        <SearchInput />
      </AnimatedView>
      <View className="mt-10 flex-1 px-6">
        <ScrollableList
            data={Array.from({length:10})}
            renderItem={() => <NewsLetterCard />}
            handleScroll={handleScroll}
          />
      </View>
    </TabsContainer>
  );
};

export default Newsletter;
