



import { View, Text, Image } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome6 } from '@expo/vector-icons'

const RunningQuiz = () => {
  return (
    <View className='flex-row gap-3 items-center'>
      <Image 
        className='w-[120px] h-[120px] rounded-lg'
        source={{uri: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",}}
      />
      <View className='flex-1'>
        <Text className='text-blue-primary dark:text-blue-secondary font-semibold text-2xl'>
          CLIC DESAFIOS
        </Text>
        <View>
          <View className='flex-row gap-2 items-center'>
            <AntDesign name="profile" size={12} color="gray" />
            <Text className='font-normal gap-2 flex-row text-gray-400'>
              <Text className='text-blue-primary dark:text-blue-secondary'>8</Text>/10 Questões
            </Text>
          </View>
          <View className='flex-row gap-2 items-center'>
            <FontAwesome6  name="clock" size={12} color="grey" /> 
            <Text className='text-gray-400 gap-2 font-normal'>
              <Text className='text-blue-primary dark:text-blue-secondary'>10</Text> min
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default RunningQuiz