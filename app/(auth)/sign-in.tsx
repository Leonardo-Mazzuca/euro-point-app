


import { View, Text } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginSchema } from '@/schemas/auth'
import { useAuth } from '@/hooks/useAuth'

const SignIn = () => {

  const {} = useAuth();
  
  return (
    <View>
      <Text>SignIn</Text>
    </View>
  )
}

export default SignIn