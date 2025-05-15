



import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Badge from './badge'
import { cn } from '@/lib/utils'

type QuestionCardProps = {
    question: Question
}
const QuestionCard = ({question:{correctAnswer,options,title}}: QuestionCardProps) => {

  const [selectedAnswer, setSelectedAnswer] = useState("");

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
            className={cn('flex-row p-2 rounded-3xl items-center gap-2', selectedAnswer === item.answer ? 
              "bg-blue-primary dark:bg-dark-card" 
              : "bg-white dark:bg-dark-primary")}
            onPress={() => setSelectedAnswer(item.answer)}
          >
            <Badge>
                {item.answer}
            </Badge>
            <Text className={cn('text-xl dark:text-white font-normal', selectedAnswer === item.answer && "text-white dark:text-gray-200")}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default QuestionCard