


import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'

type BadgeProps = {
    children: React.ReactNode
    className?: string
    colors?: string[]
} 

const Badge = ({colors,className,children,...rest}:BadgeProps) => {
  return (
    <LinearGradient
        className={className}
        start={{x:0,y:0}}
        end={{x:0,y:1.5}}
        //@ts-ignore
        colors={colors || [Colors.default.lightGradientBlue1, Colors.default.lightGradientBlue2]} 
        {...rest}
        style={{borderRadius:100,width:40,height: 40,alignItems:"center",justifyContent:"center",marginStart: 2}}
    >
        <Text className='text-white font-semibold text-xl'>
            {children}
        </Text>
    </LinearGradient>
  )
}

export default Badge