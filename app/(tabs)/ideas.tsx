
import React from 'react'
import TabsContainer from '@/components/tabs-container'
import AnimatedView from '@/components/animated-view'
import Header from '@/components/header'
import SearchInput from '@/components/search-input'
import { Button } from '@/components/Button'
import { FlatList, Text, View } from 'react-native'
import ScrollableList from '@/components/scrollable-list'
import IdeaCard from '@/components/idea-card'

const Ideas = () => {


  return (
    <TabsContainer>
      <View className='px-6 pt-4'>
        <Header />
        <SearchInput placeholder='Procure uma ideia'/>
        <Button className='bg-blue-primary mx-auto rounded-full py-2 px-5'>
          <Text className='text-white font-semibold text-lg'>
            Publicar ideia
          </Text>
        </Button>
      </View>
      <FlatList 
        className='mt-10'
        data={Array.from({ length: 5 })}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} 
        columnWrapperStyle={{ gap: 20, alignItems:"center",justifyContent:"center",marginTop: 20 }} 
        renderItem={({ item }) => (
            <IdeaCard />
        )}
      />
    </TabsContainer>
  )
}

export default Ideas