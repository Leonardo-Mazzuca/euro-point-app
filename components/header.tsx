

import { View, Text } from 'react-native'
import React from 'react'
import UserButton from './user-button'
import Logo from './logo'
import Container from './container'

type HeaderProps = {
    leftChild?: React.ReactNode,
    rightChild?: React.ReactNode
    hideProfile?:boolean
}
const Header = ({hideProfile = false,leftChild,rightChild}: HeaderProps) => {
  return (
    <Container className='flex p-8 items-center justify-between flex-row'>
      {leftChild}
      {!hideProfile && <UserButton />}
      <Logo />
      {rightChild}
    </Container>
  )
}

export default Header