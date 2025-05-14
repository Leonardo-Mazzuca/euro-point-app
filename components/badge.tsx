


import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

type BadgeProps = {
    children: React.ReactNode
    className?: string
}
const Badge = ({children}:BadgeProps) => {
  return (
    <LinearGradient
        colors={['#FFB800', '#FF6A00']}
    >
        <Text>
            {children}
        </Text>
    </LinearGradient>
  )
}

export default Badge