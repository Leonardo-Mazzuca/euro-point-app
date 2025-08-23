
import React from 'react'
import { Stack } from 'expo-router'

const SplashLayout = () => {
  return (
    <Stack>
        <Stack.Screen 
            name='index'
            options={{
                headerShown: false
            }}
        />
    </Stack>
  )
}

export default SplashLayout