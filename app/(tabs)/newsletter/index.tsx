import React, { useRef, useState } from "react";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import { Animated, FlatList } from "react-native";
import CategoriesScroll from "@/components/categories-scroll";
import NewsLetterCard from "@/components/newsletter-card";
import AnimatedView from "@/components/animated-view";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SearchInput from "@/components/search-input";

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
