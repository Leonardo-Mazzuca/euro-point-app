



import ProfileContainer from '@/components/profile-container'
import ProfileHeader from '@/components/profile-header'
import QuizCard from '@/components/quiz-card'
import { useQuizzes } from '@/hooks/use-quizzes'
import React, { useState } from 'react'
import { FlatList, View } from 'react-native'


const Pontuations = () => {

  const [selected, setSelected] = useState("");

  const {quizzes} = useQuizzes();

  return (
    <ProfileContainer>
      <ProfileHeader
        text='Pontuações quizzes'
      />  
      <View className='px-6 flex-1'>
        {/* <FlatList 
          className='mt-10'
          data={quizzes.filter(quiz => quiz.answerdId !== undefined)}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{gap: 25}}
          renderItem={({item}) => (
            <QuizCard 
              quiz={item}
              selected={selected}
              setSelected={setSelected}
              showAnswered
            />
          )}
        /> */}
      </View>
    </ProfileContainer>
  )
}

export default Pontuations