


import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView>
      <View className='flex items-center justify-center h-full'>
        <Text className='text-3xl text-center text-red-600 font-bold'>
          Boa tarde pra todos menos pra Livia
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default Home