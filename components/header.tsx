
import React from 'react'
import UserButton from './user-button'
import Logo from './logo'
import Container from './container'
import { View } from 'react-native'

type HeaderProps = {
    leftChild?: React.ReactNode,
    rightChild?: React.ReactNode
    hideProfile?:boolean
}
const Header = ({hideProfile = false,leftChild,rightChild}: HeaderProps) => {
  return (
    <View>
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

      <View className='bg-gray-200' style={{height:1}} />

    </View>
  )
}

export default Header