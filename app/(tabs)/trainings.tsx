

import { Animated, FlatList, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
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

const Trainings = () => {

  const categories = ["Programas", "Quizzes"]
  const [category, setCategory] = useState(categories[0]);
  const uiTranslateY = useRef(new Animated.Value(0)).current;
  const {handleScroll,uiOpacity} = useScrollAnimation({translateValue: uiTranslateY});

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

      <View className='flex-1 px-6'>
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
              data={quizzes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <QuizCard />
              )}
            />
            <View className='my-3'>
              <Text className='font-semibold text-xl'>
                Continue
              </Text>
            </View>
            <Button className='bg-blue-primary'>
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