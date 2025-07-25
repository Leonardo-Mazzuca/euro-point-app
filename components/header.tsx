
import React from 'react'
import UserButton from './user-button'
import Logo from './logo'
import Container from './container'
import { View } from 'react-native'
import { useLayoutContext } from '@/context/layout-context'

type HeaderProps = {
    leftChild?: React.ReactNode,
    rightChild?: React.ReactNode
    middleChild?: React.ReactNode
    hideProfile?:boolean
    hideLine?:boolean
}
const Header = ({hideProfile = false,leftChild,rightChild,hideLine, middleChild}: HeaderProps) => {

  const {theme} = useLayoutContext();


  return (
    <View className='bg-white dark:bg-black'>
      <Container className='p-8 items-center flex-row'>
        <View className='flex-1'>
          {leftChild}
          {!hideProfile && <UserButton />}
        </View>

          {!middleChild && (
           <Logo />
          )}

          {middleChild}

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