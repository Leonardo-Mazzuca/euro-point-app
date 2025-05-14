

import { Animated, FlatList, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import TabsContainer from '@/components/tabs-container'
import AnimatedView from '@/components/animated-view'
import Header from '@/components/header'
import CategoriesScroll from '@/components/categories-scroll'
import SearchInput from '@/components/search-input'
import { programData, quizzes } from '@/constants/data'
import ProgramCard from '@/components/program-card'
import ScrollableList from '@/components/scrollable-list'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import QuizCard from '@/components/quiz-card'
import { Button } from '@/components/Button'
import RunningQuiz from '@/components/running-quiz'
import { useLayoutContext } from '@/context/layout-context'
import { useIsFocused } from '@react-navigation/native'

const Trainings = () => {

  const categories = ["Programas", "Quizzes"]
  const [category, setCategory] = useState(categories[0]);
  const uiTranslateY = useRef(new Animated.Value(0)).current;
  const {handleScroll,uiOpacity} = useScrollAnimation({translateValue: uiTranslateY});
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const {setHidePostButton} = useLayoutContext();

  const isFocused = useIsFocused();

  useEffect(()=> {
    if(isFocused) {
      setHidePostButton(true)
    } else {
      setHidePostButton(false)
    }
  },[isFocused])

  const placeholder = category === "Programas" ? "Busque um programa..." : "Busque um quiz...";

  return (
    <TabsContainer>
      <AnimatedView 
        style={{ opacity: uiOpacity, transform: [{ translateY: uiTranslateY }] }}
      >

        <Header />

        <CategoriesScroll 
          categories={categories}
          selected={category}
          setSelected={setCategory}
        />

        <SearchInput 
          placeholder={placeholder}
        />

      </AnimatedView>

      <View className='flex-1 mt-5 px-6'>
        {category === 'Programas' && (
          <ScrollableList 
            data={programData}
            handleScroll={handleScroll}
            renderItem={({item})=> (
              <ProgramCard />
            )}  
          />
        )}

        {category === 'Quizzes' && (
          <View className='px-4' style={{paddingTop: 220}}>
            <FlatList
              className='h-[300px]'
              data={quizzes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <QuizCard
                  selected={selectedQuiz}
                  setSelected={setSelectedQuiz}
                  quiz={item}
                />
              )}
              contentContainerStyle={{gap: 15}}
            />
            <View>
              <Text className='font-semibold dark:text-white my-3 text-xl'>
                Continue
              </Text>
              <RunningQuiz />
            </View>
            <Button disabled={selectedQuiz === ""} className='bg-blue-primary mt-10'>
              <Text className='font-semibold text-xl text-white'>
                Começar Quiz
              </Text>
            </Button>
          </View>
        )}
      </View>
    </TabsContainer>
  )
}

export default Trainings