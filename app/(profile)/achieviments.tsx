
import React from 'react'
import ProfileContainer from '@/components/profile-container'
import ProfileHeader from '@/components/profile-header'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import AchievimentCard from '@/components/achieviment-card'
import { useLayoutContext } from '@/context/layout-context'
import { useAchieviments } from '@/hooks/use-achieviments'
import Loading from '@/components/loading'


const Achieviments = () => {

  const {currentUser} = useLayoutContext();
  const {achieviments,isLoading,refetch,isRefetching} = useAchieviments();

  if(isLoading){
    return <Loading/>
  }

  return (
    <ProfileContainer className='px-4'>
      <ProfileHeader
        text="Minhas conquistas"
      />
      <View className='flex-1'>

      <View className='flex-row gap-1 my-3 items-center'>
        <Text className='dark:text-white text-xl font-semibold'>
          Meus pontos
        </Text>
        <View className='bg-green-500/25 rounded-xl ms-2 px-2'>
          <Text className='text-green-500 text-xl font-semibold'>
            {currentUser.total_points}
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
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        />
      </View>
    </ProfileContainer>
  )
}

export default Achieviments