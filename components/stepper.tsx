

import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Badge from '@/components/badge'

type StepperProps = {
    steps: number
    currentStep: number
}
const Stepper = ({currentStep,steps}: StepperProps) => {
  return (
    <FlatList 
        data={Array.from({length: steps})}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 10}}
        renderItem={({item,index}) => (
            <Badge>
                {index+1}
            </Badge>
        )}
    />
  )
}

export default Stepper