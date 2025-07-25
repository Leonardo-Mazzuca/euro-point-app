import React, { useRef, useState } from "react";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import { Animated, RefreshControl, View } from "react-native";
import CategoriesScroll from "@/components/categories-scroll";
import NewsLetterCard from "@/components/newsletter-card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SearchInput from "@/components/search-input";
import ScrollableList from "@/components/scrollable-list";
import { useNewsletter } from "@/hooks/use-newsletter";
import Loading from "@/components/loading";

const Newsletter = () => {
  const categories = ["Para você", "TI", "RH", "Corporativo", "Interno"];
  const [selected, setSelected] = useState(categories[0]);
  const uiTranslateY = useRef(new Animated.Value(0)).current;
  const {handleScroll} = useScrollAnimation({translateValue: uiTranslateY});
  const {isLoading,isRefetching,newsletters,refetch} = useNewsletter();

  if(isLoading){
    return <Loading />
  }

  return (
    <TabsContainer>
      <View 
       className="px-3"
      >
        <Header />
        <CategoriesScroll
          categories={categories}
          selected={selected}
          setSelected={setSelected}
        />
        <SearchInput />
      </View>
      <View className="mt-4 flex-1 px-6">
        <ScrollableList
            data={newsletters}
            renderItem={({item}) => <NewsLetterCard newsletter={item} />}
            handleScroll={handleScroll}
            refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          />
      </View>
    </TabsContainer>
  );
};

export default Newsletter;
