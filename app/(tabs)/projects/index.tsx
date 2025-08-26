
import { Animated, Keyboard, RefreshControl, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SearchInput from "@/components/search-input";
import CategoriesScroll from "@/components/categories-scroll";
import ProjectCard from "@/components/project-card";
import ScrollableList from "@/components/scrollable-list";
import { useProjects } from "@/hooks/use-projects";
import Loading from "@/components/loading";
import Empty from "@/components/empty";

const Projects = () => {
  const uiTranslateY = useRef(new Animated.Value(0)).current;
  const {handleScroll} = useScrollAnimation({translateValue: uiTranslateY});
  const categories = ["Em andamento", "Concluidos"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const {isLoading,projects,refetch,isRefetching} = useProjects();
  const [search, setSearch] = useState("");
  const [filteredProjects, setfilteredProjects] = useState<Project[]>([]);


  useEffect(()=> {
    let filtered = projects;

    if(selectedCategory === categories[0]){
      filtered = filtered?.filter((project) => project.status === "RUNNING" as ProjectStatus);
    }else if(selectedCategory === categories[1]){
      filtered = filtered?.filter((project) => project.status === "FINISHED" as ProjectStatus);
    }

    setfilteredProjects(filtered);
  },[selectedCategory]);

  useEffect(()=> {
    if(projects){
      setfilteredProjects(projects);
    }
  },[projects]);

  useEffect(()=> {
      if (search.trim() === "") {
        Keyboard.dismiss(); 
        setfilteredProjects(projects); 
        return;
      }
      const filtered = projects?.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()));
      setfilteredProjects(filtered);
  },[search]);

  if(isLoading){
    return <Loading />
  }

  return (
    <TabsContainer>
      <View
       className="px-3"
      >
        <Header />
        <View className="my-2">
          <CategoriesScroll
            className="mt-4"
            categories={categories}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <SearchInput value={search} onChangeText={setSearch} placeholder="Busque um projeto..." />

        </View>

      </View>
      <View className="flex-1 px-6">
        <ScrollableList 
            data={filteredProjects}
            renderItem={({item}) => 
              <ProjectCard 
                project={item}
              />
            }
            ListEmptyComponent={() => (
              <Empty
                title="Hmmmm nenhum projeto foi encontrado :("
                subtitle="Acho que a aquipe de times anda meio preguiçosa..."
                animationSource={require("../../../assets/lottie/project-empty.json")}

              />
            )}
            handleScroll={handleScroll}
            refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          />
      </View>
    </TabsContainer>
  );
};

export default Projects;
