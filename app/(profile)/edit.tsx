
import React from 'react'
import ProfileContainer from '@/components/profile-container'
import ProfileHeader from '@/components/profile-header'
import ProfileAvatar from '@/components/profile-avatar'
import { Text, View } from 'react-native'
import { Label } from '@/components/Label'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import ExitButton from '@/components/exit-button'

const ProfileEdit = () => {

  return (
    <ProfileContainer>
      <ProfileHeader text='Dados do Perfil'/>
      <ProfileAvatar horientation='column' />
      <View className='px-4 flex-1'>
        <View className='py-2'>
            <Label>
              Nome
            </Label>
            <Input variant='outline'/>
        </View>
        <View className='py-2'>
            <Label>
              Área
            </Label>
            <Input variant='outline' />
        </View>
        <View className='py-2'>
            <Label>
              Email
            </Label>
            <Input variant='outline' />
        </View>
        <View className='py-2'>
            <Label>
              Telefone
            </Label>
            <Input variant='outline' />
        </View>
        <Button className='mt-10  bg-blue-primary'>
          <Text className='text-lg font-semibold text-white'>
            Salvar
          </Text>
        </Button>
        <View className='mt-auto'>
          <ExitButton />
        </View>
      </View>

    </ProfileContainer>
  );
}

export default ProfileEdit