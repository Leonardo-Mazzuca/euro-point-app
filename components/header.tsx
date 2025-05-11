
import React, { useEffect } from 'react'
import UserButton from './user-button'
import Logo from './logo'
import Container from './container'
import { View } from 'react-native'
import { useLayoutContext } from '@/context/layout-context'

type HeaderProps = {
    leftChild?: React.ReactNode,
    rightChild?: React.ReactNode
    hideProfile?:boolean
    hideLine?:boolean
}
const Header = ({hideProfile = false,leftChild,rightChild,hideLine}: HeaderProps) => {

  const {theme} = useLayoutContext();


  return (
    <View className='bg-white dark:bg-black' style={{marginTop:25}}>
      <Container className='p-8 items-center flex-row'>
        <View className='flex-1'>
          {leftChild}
          {!hideProfile && <UserButton />}
        </View>

         <Logo />

        <View className='flex-1'>
        {rightChild}
        </View>
      </Container>

      {(!hideLine && theme !== "dark") && (
        <View className='bg-gray-200 dark:bg-transparent' style={{height:1}} />
      )}

    </View>
  )
}

export default Header