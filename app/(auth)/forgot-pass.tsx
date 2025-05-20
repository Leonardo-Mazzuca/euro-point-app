

import React from 'react'
import AuthContainer from '@/components/auth-container'
import BackButton from '@/components/back-button'
import { router } from 'expo-router'
import { Text, View } from 'react-native'
import { Label } from '@/components/Label'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

const ForgotPass = () => {
  return (
    <AuthContainer>
          <BackButton iconSize={32} handleBack={() => router.back()} />
            <View className='mt-3'>
              <Text className='dark:text-white font-semibold text-xl'>
                Esqueceu a senha
              </Text>
              <Text className='mt-2 dark:text-gray-300 text-gray-500'>
                Por favor insira seu email para resetar a senha
              </Text>
            </View>
            <View className='mt-10'>
              <Label>
                Email
              </Label>
              <Input
                variant='outline'
                placeholder='eurofarma@email.com'
                className='ps-2'
              />
            </View>
            <Button className='mt-5 bg-blue-primary'>
              <Text className='text-white font-semibold text-lg'>
                Resetar senha
              </Text>
            </Button>
    </AuthContainer>
  )
}

export default ForgotPass