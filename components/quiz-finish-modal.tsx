

import { Text } from 'react-native'
import ModalScreen from '@/components/modal-screen'
import { Button } from '@/components/Button'
import { router } from 'expo-router'

type Props = {
    visible: boolean,
    quizData: {
        totalPoints: number,
        totalErrors: number,
        totalRights: number
    }
}

const QuizFinishModal = ({
    visible,
    quizData
}:Props) => {
  return (
        <ModalScreen
        visible={visible}
        header={
          <Text className="dark:text-white text-zinc-600 text-2xl">
            Quiz finalizado!
          </Text>
        }
      >
        <Text className="font-semibold my-2 dark:text-gray-200 text-gray-600 text-xl">
          Dados:
        </Text>
        <Text className="dark:text-gray-400 text-gray-500 my-2">
          Pontos: {quizData.totalPoints}
        </Text>
        <Text className="dark:text-gray-400 text-gray-500 my-2">
          Erros: {quizData.totalErrors}
        </Text>
        <Text className="dark:text-gray-400 text-gray-500 my-2">
          Acertos: {quizData.totalRights}
        </Text>
        <Button onPress={()=>router.push("/(tabs)/trainings")} className="bg-blue-primary my-2">
          <Text className="text-yeallow-primary">Voltar para a tela de quizzes</Text>
        </Button>
      </ModalScreen>
  )
}

export default QuizFinishModal