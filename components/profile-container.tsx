
import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileContainer = ({children}:{children:ReactNode}) => {
  return (
    <SafeAreaView className='flex-1 py-4 px-2 bg-white dark:bg-dark-primary'>
        {children}
    </SafeAreaView>
  )
}

export default ProfileContainer