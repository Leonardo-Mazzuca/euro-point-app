

import { Text, View } from 'react-native'
import ModalScreen from '@/components/modal-screen'
import { Button } from '@/components/Button'
import { router } from 'expo-router'
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated'
import AntDesign from '@expo/vector-icons/AntDesign';
import LottieView from 'lottie-react-native'

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


  const getStarsCount = () => {
    const errors = quizData.totalErrors;

    if (errors < 5) {
      return 5;
    } else if (errors < 10) {
      return 4;
    } else if (errors < 15) {
      return 3;
    } else {
      return 2;
    }
  }


  return (
        <ModalScreen
        visible={visible}
        wrapperClassNames='w-[300px]'
        enableCloseButton={false}
      >
        <Animated.View entering={FadeInLeft.duration(100)}>
          <View className='justify-center items-center'>
            <LottieView
              source={require("../assets/lottie/congrats.json")}
              autoPlay
              style={{
                width: 300,
                height: 200,
                
              }}
            />
          </View>
          <Animated.Text entering={FadeInDown.duration(200)} className='my-4 font-semibold text-3xl dark:text-white text-zinc-700 text-center'>
            Quiz finalizado!
          </Animated.Text>
          <View className='flex-row items-center gap-3 justify-center'>
            {Array.from({length: getStarsCount()}).map((_, index) => (
              <AntDesign key={index} name="star" size={24} color="gold" />
            ))}
          </View>
          <Animated.Text entering={FadeInLeft.duration(300)} className="dark:text-zinc-400 text-center text-gray-500 my-2">
            <Bold text='Pontos:' /> {quizData.totalPoints}
          </Animated.Text>
          <Button onPress={()=>router.push("/(tabs)/trainings")} className="bg-blue-primary my-2">
            <Text className="text-yeallow-primary text-xl font-semibold">Voltar</Text>
          </Button>
        </Animated.View>
      </ModalScreen>
  )
}

const Bold = ({text}:{text:string}) => {
  return (
    <Text className='font-bold text-xl dark:text-white text-gray-800'>{text}</Text>
  )
}

export default QuizFinishModal