



import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Badge from './badge'
import { cn } from '@/lib/utils'
import { Colors } from '@/constants/Colors'

type QuestionCardProps = {
    question: Question
}
const QuestionCard = ({question:{correctAnswer,options,title}}: QuestionCardProps) => {

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const selectedColors = [Colors.default.lightGradientBlue1, Colors.default.lightGradientBlue2];
  const notSelectedColors = [Colors.light.neutralGray,Colors.light.neutralGray];

  return (
    <View className='px-8 py-8'>
      <Text className='text-xl dark:text-white font-semibold'>
        {title}
      </Text>
      <FlatList 
        className='mt-5'
        data={options}
        contentContainerStyle={{gap:25}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity 
            className={'flex-row p-2 rounded-3xl items-center gap-2'}
            onPress={() => setSelectedAnswer(item.answer)}
          >
            <Badge 
            textClasses={cn('text-zinc-800',selectedAnswer === item.answer && "text-white")}
            colors={selectedAnswer === item.answer ? selectedColors : notSelectedColors}>
                {item.answer}
            </Badge>
            <Text className={'text-xl dark:text-gray-300 font-normal'}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default QuestionCard