


import React from 'react'
import { Button } from '@/components/Button'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'

const PostButton = () => {
  
  const onPress = () => router.push("/post-screen");

  return (
    <Button 
      onPress={onPress}
      size={"icon"} 
      style={{zIndex:999}}
      className='bg-blue-primary rounded-full w-[60px] h-[60px]'
    >
      <AntDesign
        name='plus'
        size={28}
        color={Colors.light.primaryYeallow}
      />
    </Button>
  )
}

export default PostButton