

import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Badge from '@/components/badge'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'

type StepperProps = {
    steps: number
    currentStep: number
    setCurrentStep: (value: number) => void
}
const Stepper = ({currentStep,steps,setCurrentStep}: StepperProps) => {

  const disabledColors = ["#D4D4D4","#D4D4D4"];

  return (
    <View className='px-4'>
      <FlatList
        data={Array.from({ length: steps })}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View className="items-center">
            <TouchableOpacity onPress={() => setCurrentStep(index + 1)}>
              <Badge colors={currentStep === index + 1 ? undefined : disabledColors}>
                {index + 1}
              </Badge>
            </TouchableOpacity>

            <LinearGradient
              //@ts-ignore
              colors={
                currentStep === index + 1
                  ? [Colors.default.lightGradientBlue1, Colors.default.lightGradientBlue2]
                  : disabledColors
              }
              style={{
                marginTop: 10,
                width: 50,
                height: 3,
              }}
            />
          </View>
        )}
      />
    </View>
  )
}

export default Stepper