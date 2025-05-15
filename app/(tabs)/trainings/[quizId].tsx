

import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import TabsContainer from '@/components/tabs-container';
import Header from '@/components/header';
import Stepper from '@/components/stepper';

const SingleQuiz = () => {

  const {quizId} = useLocalSearchParams();
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <TabsContainer>
      <Header />
      <View className='px-4 gap-3'>
        <Text className='dark:text-white text-2xl font-semibold'>
          Quiz {quizId}
        </Text>
        <Stepper
          steps={10}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </View>
    </TabsContainer>
  )
}

export default SingleQuiz