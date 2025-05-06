


import {Text, Animated, View } from 'react-native'
import React, { useState } from 'react'
import { Checkbox } from '@/components/Checkbox'

type IdeaCardProps = {
  idea?: Idea
  enablePost: boolean
}

const IdeaCard = ({enablePost,idea}:IdeaCardProps) => {

  const [markCard, setMarkCard] = useState(false)

  return (
    <Animated.View className={"bg-blue-secondary gap-3 rounded-2xl p-3 flex-1"}>
      <View className='flex-row'>
      <Text className='text-xl font-semibold'>
        Title
      </Text>
        {enablePost && (
          <Checkbox className='ms-auto' checked={markCard} onCheckedChange={markCard => setMarkCard(markCard)} />
        )}
      </View>
      <Text>
        Adasdasdsadsadsadasdasdsdasdsadsadadadsadsad
      </Text>
    </Animated.View>
  )
}

export default IdeaCard