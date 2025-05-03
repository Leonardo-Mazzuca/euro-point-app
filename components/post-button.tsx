


import React from 'react'
import { Button } from '@/components/Button'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Colors } from '@/constants/Colors'

const PostButton = () => {
  
  return (
    <Button 
      size={"icon"} 
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