


import React from 'react'
import { Button } from '@/components/Button'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Colors } from '@/constants/Colors'
import { useLayoutContext } from '@/context/layout-context'


const PostButton = () => {
  
  return (
    <Button 
      size={"icon"} 
      className='bg-blue-primary absolute bottom-2 right-2 rounded-full w-[60px] h-[60px]'
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