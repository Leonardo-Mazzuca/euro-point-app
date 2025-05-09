

import { View, Text, ViewProps } from 'react-native'
import React from 'react'
import { cn } from '@/lib/utils'


const Container = ({children,className,...rest}:ViewProps) => {
  return (
    <View className={cn('flex dark:bg-dark-primary p-8 items-center justify-between flex-row',className)} {...rest}>
        {children}
    </View>
  )
}

export default Container