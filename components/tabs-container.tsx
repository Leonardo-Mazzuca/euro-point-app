

import React, { useEffect, useRef } from 'react'
import PostButton from './post-button'
import { cn } from '@/lib/utils'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import { useLayoutContext } from '@/context/layout-context'
import { Animated,Easing } from 'react-native'

type TabsContainerProps = {

} & SafeAreaViewProps
const TabsContainer = ({className,children,...rest}:TabsContainerProps) => {

  const {hidePostButton, hideUI} = useLayoutContext();
  const translateY =  useRef(new Animated.Value(0)).current;

  const ANIMATION_DURATION = 200;

  useEffect(() => {
    
    Animated.timing(translateY, {
      toValue: hideUI ? 200 : 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();

  }, [hideUI]);

  return (
    <SafeAreaView className={cn('relative dark:bg-dark-primary bg-white h-screen flex-1',className)} {...rest}>
          {children}

          <Animated.View
          style={{
            position: 'absolute',
            bottom: 90,
            right: 10,
            transform: [{ translateY }],
          }}
        >
          {!hidePostButton && (
            <PostButton />
          )}
        </Animated.View>
      
    </SafeAreaView>
  )

}

export default TabsContainer