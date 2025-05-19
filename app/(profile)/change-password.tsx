

import { View, Text } from 'react-native'
import React from 'react'
import ProfileContainer from '@/components/profile-container'
import ProfileHeader from '@/components/profile-header'
import { Label } from '@/components/Label'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

const ChangePassword = () => {
  return (
    <ProfileContainer>
      <ProfileHeader 
        text='Mudar senha'
      />
      <View className='px-8 mt-6'>
        <Text className='font-semibold text-2xl my-2 dark:text-white'>
          Digite uma nova senha
        </Text>
        <Text className='text-base text-gray-500 dark:text-gray-400'>
          Crie uma nova senha. Tenha certeza que é diferente da senha anterior por questões de segurança!
        </Text>
      </View>
      <View className='px-8 mt-6'>
        <View>
          <Label>
            Senha nova
          </Label>
          <Input variant='outline' />
        </View>
        <View className='mt-5'>
          <Label>
            Confirmar senha nova
          </Label>
          <Input variant='outline' />
        </View>
        <Button className='bg-blue-primary mt-5'>
          <Text className='text-white text-lg font-semibold'>
            Atualizar senha
          </Text>
        </Button>
      </View>
    </ProfileContainer>
  )
}

export default ChangePassword