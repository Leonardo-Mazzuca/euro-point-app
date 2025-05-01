


import React from 'react'
import PostButton from './post-button'
import { cn } from '@/lib/utils'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'

type TabsContainerProps = {

} & SafeAreaViewProps
const TabsContainer = ({className,children,...rest}:TabsContainerProps) => {

  return (
    <SafeAreaView className={cn('relative flex-1',className)} {...rest}>
        {children}
        <PostButton />
    </SafeAreaView>
  )

}

export default TabsContainer