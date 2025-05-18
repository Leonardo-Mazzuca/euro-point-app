

import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar'
import { router } from 'expo-router'

const UserButton = () => {
  //@ts-ignore
  const onPress = () => router.push("/(profile)");
  return (
    <TouchableOpacity onPress={onPress}>
    <Avatar className='h-14 w-14' alt='User image'>
      <AvatarImage
        source={{
          uri: "https://avatars.githubusercontent.com/u/66306912?v=4",
        }}
      />
      <AvatarFallback>
        <Text>LM</Text>
      </AvatarFallback>
    </Avatar>
    </TouchableOpacity>
  )
}

export default UserButton