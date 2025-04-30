

import { View, Text } from 'react-native'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar'

const UserButton = () => {
  return (
    <View>
    <Avatar alt='User image'>
      <AvatarImage
        source={{
          uri: "https://avatars.githubusercontent.com/u/66306912?v=4",
        }}
      />
      <AvatarFallback>
        <Text>LM</Text>
      </AvatarFallback>
    </Avatar>
    </View>
  )
}

export default UserButton