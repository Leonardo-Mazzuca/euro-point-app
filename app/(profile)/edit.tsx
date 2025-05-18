
import React from 'react'
import ProfileContainer from '@/components/profile-container'
import ProfileHeader from '@/components/profile-header'
import ProfileAvatar from '@/components/profile-avatar'

const ProfileEdit = () => {
  return (
    <ProfileContainer>
      <ProfileHeader text='Dados do Perfil'/>
      <ProfileAvatar horientation='column' />
    </ProfileContainer>
  )
}

export default ProfileEdit