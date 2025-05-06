import { Animated, FlatList } from "react-native";
import React, { useRef, useState } from "react";
import TabsContainer from "@/components/tabs-container";
import AnimatedView from "@/components/animated-view";
import Header from "@/components/header";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SearchInput from "@/components/search-input";
import CategoriesScroll from "@/components/categories-scroll";
import ProjectCard from "@/components/project-card";
import ScrollableList from "@/components/scrollable-list";

const Projects = () => {
  const uiTranslateY = useRef(new Animated.Value(0)).current;
  const {handleScroll,uiOpacity} = useScrollAnimation({translateValue: uiTranslateY});
  const categories = ["Em andamento", "Concluidos"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <TabsContainer>
      <AnimatedView
        style={{
          opacity: uiOpacity,
          transform: [{ translateY: uiTranslateY }],
        }}
      >
        <Header />
        <SearchInput placeholder="Busque um projeto..." />
        <CategoriesScroll
          categories={categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />

      </AnimatedView>
      <ScrollableList 
          data={Array.from({length:10})}
          renderItem={() => 
            <ProjectCard />
          }
          handleScroll={handleScroll}
        />
    </TabsContainer>
  );
};

export default Projects;
