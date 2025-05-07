
import { Button } from '@/components/Button'
import Container from '@/components/container'
import DropDown from '@/components/dropdown'
import { Input } from '@/components/Input'
import { postTypeOptions } from '@/constants/data'
import AntDesign from '@expo/vector-icons/AntDesign'
import { router } from 'expo-router'
import { useState } from 'react'
import { View } from 'react-native'

const PostScreen = () => {

  const handleClose = () => router.back();
  const [postType, setPostType] = useState<PostType | null>(null);

  return (
    <Container className='flex-col'>
      <View className='flex-row w-full items-center justify-between'>
        <Button variant={"ghost"} onPress={handleClose}>
          <AntDesign name='close' size={24} color="black"/>
        </Button>
        <View className='flex-1'>
          <DropDown
            onChange={item => {
              setPostType(item.value as PostType);
            }}
            data={postTypeOptions}
            value={postType}
            labelField="label"
            valueField="value"
            placeholder='Selecione'
          />
        </View>
      </View>
      <Input />
    </Container>
  )
}

export default PostScreen