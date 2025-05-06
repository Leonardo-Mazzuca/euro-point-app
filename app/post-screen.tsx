
import { Button } from '@/components/Button'
import Container from '@/components/container'
import AntDesign from '@expo/vector-icons/AntDesign'
import { router } from 'expo-router'
import { View } from 'react-native'

const PostScreen = () => {

  const handleClose = () => router.back();

  return (
    <Container>
      <View className='flex-row items-center justify-between'>
        <Button variant={"ghost"} onPress={handleClose}>
          <AntDesign name='close' size={24} color="black"/>
        </Button>
      </View>
    </Container>
  )
}

export default PostScreen