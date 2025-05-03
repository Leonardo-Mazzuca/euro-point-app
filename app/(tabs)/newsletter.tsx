import React, { useRef, useState } from "react";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import { Input } from "@/components/Input";
import { Animated, FlatList } from "react-native";
import CategoriesScroll from "@/components/categories-scroll";
import AntDesign from "@expo/vector-icons/AntDesign";
import NewsLetterCard from "@/components/newsletter-card";
import AnimatedView from "@/components/animated-view";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
        <Input
          className="my-4 rounded-2xl"
          placeholder="Busque uma postagem..."
          suffixIcon={<AntDesign name="search1" size={24} color="grey" />}
        />
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
