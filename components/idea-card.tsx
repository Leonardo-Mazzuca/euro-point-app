


import {Text, Animated } from 'react-native'
import React, { useState } from 'react'
import { Checkbox } from '@/components/Checkbox'


const IdeaCard = () => {

  const [markCard, setMarkCard] = useState(false)
  return (
    <Animated.View className={"bg-blue-secondary rounded-2xl p-3 w-[100px] h-[100px]"}>
      <Checkbox checked={markCard} onCheckedChange={markCard => setMarkCard(markCard)} />
      <Text>IdeaCard</Text>
    </Animated.View>
  )
}

export default IdeaCard