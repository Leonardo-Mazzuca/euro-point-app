


import { View, Text } from 'react-native'
import React from 'react'
import ModalScreen from './modal-screen';
import { Button } from './Button';

type QuizConfirmModalProps = {
    visible: boolean,
    confirmButtonText: string
    cancelButtonText: string
    onContinue: () => void;
    onCancel: () => void;
    title: string
    subtitle: string
    description?:string
}

const QuizConfirmModal = ({onCancel,onContinue,visible,cancelButtonText,confirmButtonText,subtitle,title,description}:QuizConfirmModalProps) => {
  return (
    <ModalScreen
    wrapperClassNames="w-[300px]"
      visible={visible}
      header={
        <Text className="dark:text-white mt-2 text-zinc-600 text-2xl">{title}</Text>
      }
    >
      <Text className="dark:text-gray-300 my-5 text-xl text-gray-600">
        {subtitle}
      </Text>
      {description && (
        <Text className="dark:text-gray-50">
            {description}
        </Text>
      )}
      <View className="flex-row my-5 justify-between items-center gap-3">
        <Button onPress={onCancel} className="flex-1 bg-gray-500">
          <Text className="font-semibold text-gray-100">{cancelButtonText}</Text>
        </Button>
        <Button onPress={onContinue} className="flex-1 bg-blue-primary">
          <Text className="font-semibold text-yeallow-primary">{confirmButtonText}</Text>
        </Button>
      </View>
    </ModalScreen>
  )
}

export default QuizConfirmModal