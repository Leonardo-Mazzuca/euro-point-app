
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileContainer = ({children, className}:{children:ReactNode, className? : string}) => {
  return (
    <SafeAreaView className={cn('flex-1 p-8 bg-white dark:bg-dark-primary',className)}>
        {children}
    </SafeAreaView>
  )
}

export default ProfileContainer