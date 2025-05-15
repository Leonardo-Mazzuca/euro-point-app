

import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Badge from '@/components/badge'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import { useLayoutContext } from '@/context/layout-context'

type StepperProps = {
    steps: number
    currentStep: number
    setCurrentStep: (value: number) => void
} 
const Stepper = ({currentStep,steps,setCurrentStep}: StepperProps) => {

  const {theme} = useLayoutContext();
  const disabledColors = theme !== "dark" ? [Colors.light.secondBg,Colors.light.secondBg] : [Colors.dark.secondBg,Colors.dark.secondBg];

  const flatListRef = useRef<FlatList>(null);
  
  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: currentStep - 1,
      animated: true,
      viewPosition: 0.5,
    });
  }, [currentStep]);

  return (
    <View className='px-4'>
      <FlatList
        ref={flatListRef}
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