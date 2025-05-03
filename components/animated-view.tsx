


import { Animated, StyleProp, ViewStyle } from 'react-native'
import React, { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

type AnimatedViewProps = {
    children: React.ReactNode
    style?: StyleProp<ViewStyle>
    className?:string
}

const AnimatedView = ({children,style,className}:AnimatedViewProps) => {

    const styles = [
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: '#f8f4f4'
        },
        style,
      ]

  return (
    <Animated.View 
    className={cn("px-6 pt-4",className)}
        //@ts-ignore
        style={styles}
    >
      {children}
    </Animated.View>
  )
}

export default AnimatedView