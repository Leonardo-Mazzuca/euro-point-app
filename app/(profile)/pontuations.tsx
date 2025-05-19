



import ProfileContainer from '@/components/profile-container'
import ProfileHeader from '@/components/profile-header'
import React from 'react'
import { FlatList, View } from 'react-native'


const Pontuations = () => {
  return (
    <ProfileContainer>
      <ProfileHeader
        text='Pontuações quizzes'
      />  
      <View className='px-6 flex-1'>
        <FlatList 
          data={Array.from({length: 10})}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <></>
          )}
        />
      </View>
    </ProfileContainer>
  )
}

export default Pontuations