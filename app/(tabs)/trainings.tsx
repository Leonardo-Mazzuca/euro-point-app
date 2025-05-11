

import { Animated, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import TabsContainer from '@/components/tabs-container'
import AnimatedView from '@/components/animated-view'
import Header from '@/components/header'
import CategoriesScroll from '@/components/categories-scroll'
import SearchInput from '@/components/search-input'
import { programData } from '@/constants/data'
import ProgramCard from '@/components/program-card'
import ScrollableList from '@/components/scrollable-list'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const Trainings = () => {

  const categories = ["Programas", "Quizzes"]
  const [category, setCategory] = useState(categories[0]);
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
          selected={category}
          setSelected={setCategory}
        />

        <SearchInput 
          placeholder='Busque um programa'
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

        {category === 'Quizzes' && <Text>Quizzes</Text>}
      </View>
    </TabsContainer>
  )
}

export default Trainings