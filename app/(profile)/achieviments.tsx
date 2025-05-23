
import React from 'react'
import ProfileContainer from '@/components/profile-container'
import ProfileHeader from '@/components/profile-header'
import { FlatList, Text, View } from 'react-native'
import { achieviments } from '@/constants/data'
import AchievimentCard from '@/components/achieviment-card'


const Achieviments = () => {
  return (
    <ProfileContainer>
      <ProfileHeader
        text="Minhas conquistas"
      />
      <View className='px-6 flex-1'>

      <View className='flex-row gap-1 my-3 items-center'>
        <Text className='dark:text-white text-xl font-semibold'>
          Meus pontos
        </Text>
        <View className='bg-green-500/25 rounded-xl ms-2 px-2'>
          <Text className='text-green-500 text-xl font-semibold'>
            1900
          </Text>
        </View>
      </View>

        <FlatList 
          className='mt-3 border-2 dark:border-zinc-800 border-gray-300 rounded-lg'
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