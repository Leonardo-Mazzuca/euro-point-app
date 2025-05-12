



import { View, Text, Image } from 'react-native'
import React from 'react'

const RunningQuiz = () => {
  return (
    <View className='flex-row gap-3 items-center'>
      <Image 
        className='w-[150px] h-[150px] rounded-lg'
        source={{uri: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",}}
      />
      <View>

      </View>
    </View>
  )
}

export default RunningQuiz