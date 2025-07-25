
import { Animated, RefreshControl, View } from "react-native";
import React, { useRef, useState } from "react";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SearchInput from "@/components/search-input";
import CategoriesScroll from "@/components/categories-scroll";
import ProjectCard from "@/components/project-card";
import ScrollableList from "@/components/scrollable-list";
import { useProjects } from "@/hooks/use-projects";
import Loading from "@/components/loading";

const Projects = () => {
  const uiTranslateY = useRef(new Animated.Value(0)).current;
  const {handleScroll,uiOpacity} = useScrollAnimation({translateValue: uiTranslateY});
  const categories = ["Em andamento", "Concluidos"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const {isLoading,projects,refetch,isRefetching} = useProjects();

  if(isLoading){
    return <Loading />
  }

  return (
    <TabsContainer>
      <View
       className="px-3"
      >
        <Header />
        <View className="gap-4">
          <SearchInput placeholder="Busque um projeto..." />
          <CategoriesScroll
            categories={categories}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
        </View>

      </View>
      <View className="flex-1 px-6">
        <ScrollableList 
            data={projects}
            renderItem={({item}) => 
              <ProjectCard 
                project={item}
              />
            }
            handleScroll={handleScroll}
            refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          />
      </View>
    </TabsContainer>
  );
};

export default Projects;
