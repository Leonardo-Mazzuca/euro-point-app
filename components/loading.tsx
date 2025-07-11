


import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useLayoutContext } from '@/context/layout-context'

const Loading = () => {

  const {theme} = useLayoutContext();

  const isDark = theme === "dark";

  return (
    <View className='items-center justify-center h-screen dark:bg-zinc-900'>
        <ActivityIndicator size="large" color={isDark ? Colors.dark.primaryBlue : Colors.light.primaryBlue} />
    </View>
  )
}

export default Loading