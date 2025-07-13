import { Animated, FlatList, RefreshControl, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import CategoriesScroll from "@/components/categories-scroll";
import SearchInput from "@/components/search-input";
import ProgramCard from "@/components/program-card";
import ScrollableList from "@/components/scrollable-list";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import QuizCard from "@/components/quiz-card";
import { Button } from "@/components/Button";
import RunningQuiz from "@/components/running-quiz";
import { useLayoutContext } from "@/context/layout-context";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import { usePrograms } from "@/hooks/use-programs";
import { useQuizzes } from "@/hooks/use-quizzes";
import Loading from "@/components/loading";

const Trainings = () => {
  const categories = ["Programas", "Quizzes"];
  const [category, setCategory] = useState(categories[0]);
  const uiTranslateY = useRef(new Animated.Value(0)).current;
  const { handleScroll, uiOpacity } = useScrollAnimation({
    translateValue: uiTranslateY,
  });
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const { setHidePostButton } = useLayoutContext();

  const {programs,isLoading:isLoadingProgram,refetch: refetchProgram, isRefetching: isRefetchingProgram} = usePrograms();
  const {quizzes,isLoading: isLoadingQuizzes, refetch: refetchQuizzes, isRefetching: isRefetchingQuizzes} = useQuizzes();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setHidePostButton(true);
    } else {
      setHidePostButton(false);
    }
  }, [isFocused]);

  const placeholder =
    category === "Programas" ? "Busque um programa..." : "Busque um quiz...";

  const handleQuizClick = () => {
    router.push(`/trainings/${selectedQuiz}`);
  };

  console.log(quizzes);
  
  const hasRunningQuiz = quizzes.some(quiz => quiz.is_running);

  if(isLoadingProgram || isLoadingQuizzes) {
    return <Loading />
  }

  return (
    <TabsContainer>
      <View className="px-4">
        <Header />

        <CategoriesScroll
          categories={categories}
          selected={category}
          setSelected={setCategory}
        />

        <SearchInput placeholder={placeholder} />
      </View>

      <View className="flex-1 px-6">
        {category === "Programas" && (
          <ScrollableList
            data={programs}
            handleScroll={()=>{}}
            renderItem={({ item }) => <ProgramCard program={item} />}
            contentContainerStyle={{paddingTop:0,paddingBottom:80, gap: 15}}
            refreshControl={<RefreshControl refreshing={isRefetchingProgram} onRefresh={refetchProgram} />}
          />
        )}

        {category === "Quizzes" && (
          <View>
            <FlatList
              data={quizzes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <QuizCard
                  selected={selectedQuiz}
                  setSelected={setSelectedQuiz}
                  quiz={item}
                />
              )}
              className="h-[200px]"
              contentContainerStyle={{ gap: 15 }}
            />    
            
            {hasRunningQuiz && (
              <>
                <Text className="font-semibold dark:text-white my-3 text-xl">
                  Continue
                </Text>
                <FlatList
                  data={quizzes}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <RunningQuiz runningQuiz={item} />
                  )}
                  className="h-[200px]"
                  contentContainerStyle={{ gap: 15 }}
                />
              </>
            )}

            <Button
              onPress={handleQuizClick}
              disabled={selectedQuiz === null}
              className="bg-blue-primary mt-10"
            >
              <Text className="font-semibold text-xl text-white">
                Começar Quiz
              </Text>
            </Button>
          </View>
        )}
      </View>
    </TabsContainer>
  );
};

export default Trainings;
