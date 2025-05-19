
import React from 'react'
import ProfileContainer from '@/components/profile-container'
import ProfileHeader from '@/components/profile-header'
import { FlatList, View } from 'react-native'
import { achieviments } from '@/constants/data'
import AchievimentCard from '@/components/achieviment-card'


const Achieviments = () => {
  return (
    <ProfileContainer>
      <ProfileHeader
        text="Minhas conquistas"
      />

      <View className='px-6 flex-1'>
        <FlatList 
          className='mt-10 border-2 dark:border-zinc-800 border-gray-300 rounded-lg'
          data={achieviments}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item})=> (
            <AchievimentCard 
              achieviment={item}
            />
          )}
        />
      </View>
    </ProfileContainer>
  )
}

export default Achieviments