



import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, FontAwesome6, Feather } from '@expo/vector-icons'
import { Button } from '@/components/Button'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { useQuizzes } from '@/hooks/use-quizzes'
import QuizConfirmModal from './quiz-confirm-modal'

type Props = {
  runningQuiz: Quiz
}
const RunningQuiz = ({runningQuiz}:Props) => {

  const {onQuizRunningDiscard} = useQuizzes();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleQuizClick = () => {
    router.push(`/trainings/${runningQuiz.id}`);
  };

  const handleDiscard = async () => {
    await onQuizRunningDiscard(runningQuiz.id);
    setOpenConfirmModal(false);
  }
  
  const onDeleteClick = () => setOpenConfirmModal(true);

  return (
    <View className='flex-row gap-3 items-center'>
      <Image 
        className='w-[120px] h-[120px] rounded-lg'
        source={{uri: runningQuiz.image}}
      />
      <View className='flex-1'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-blue-primary dark:text-blue-secondary font-semibold text-2xl'>
            {runningQuiz.title}
          </Text>
          <Button
            variant={"ghost"}
            size={"icon"}
            onPress={onDeleteClick}
          >
            <Feather name="trash-2" size={20} color={Colors.default.lightGray} />
          </Button>
        </View>
        <View>
          <View className='flex-row gap-2 items-center'>
            <AntDesign name="profile" size={12} color="gray" />
            <Text className='font-normal gap-2 flex-row text-gray-400'>
              <Text className='text-blue-primary dark:text-blue-secondary'>{runningQuiz.current_question_index+1 || 0}</Text>/{runningQuiz.questions.length} Questões
            </Text>
          </View>
          <View className='flex-row gap-2 items-center'>
            <FontAwesome6  name="clock" size={12} color="grey" /> 
            <Text className='text-gray-400 gap-2 font-normal'>
              <Text className='text-blue-primary dark:text-blue-secondary'>{runningQuiz.duration}</Text>
            </Text>
          </View>
          <Button
           onPress={handleQuizClick}
           className='my-2 bg-dark-gray  h-[60px]' >
            <Text className='text-white font-medium dark:text-gray-300'>
              Continue o quiz
            </Text>
          </Button>
        </View>
      </View>
      <QuizConfirmModal 
        visible={openConfirmModal}
        onCancel={() => setOpenConfirmModal(false)}
        onContinue={handleDiscard}
        title='Calma ai!'
        subtitle='Tem certeza que deseja deletar o quiz?'
        confirmButtonText='Sim, deletar'
        cancelButtonText='Nãoo, cancela!'
      />
    </View>
  )
}

export default RunningQuiz