


import React from 'react'
import { Stack } from 'expo-router'

const ProfileLayout = () => {
  return (
    <Stack>
        <Stack.Screen 
            name='index'
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen 
            name='edit'
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen 
            name='change-password'
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen 
            name='pontuations'
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen 
            name='saved'
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen 
            name='achieviments'
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen 
            name='posts'
            options={{
                headerShown: false
            }}
        />
    </Stack>
  )
}

export default ProfileLayout