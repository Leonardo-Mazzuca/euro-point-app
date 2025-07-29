
import React from 'react'
import { Stack } from 'expo-router'
import { QuizProvider } from '@/context/quiz-context'

const QuizLayout = () => {
  return (
    <QuizProvider>
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='[quizId]'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='quiz-help'
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    </QuizProvider>
  )
}

export default QuizLayout