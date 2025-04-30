

import { View, Text } from 'react-native'
import React from 'react'
import UserButton from './user-button'
import Logo from './logo'

type HeaderProps = {
    leftChild?: React.ReactNode,
    rightChild?: React.ReactNode
    hideProfile?:boolean
}
const Header = ({hideProfile = false,leftChild,rightChild}: HeaderProps) => {
  return (
    <View className='flex itcems-center justify-between flex-row'>
      {leftChild}
      {!hideProfile && <UserButton />}
      <Logo />
      {rightChild}
    </View>
  )
}

export default Header