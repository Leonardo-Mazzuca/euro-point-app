
import React, { useState } from 'react'
import TabsContainer from '@/components/tabs-container'
import Header from '@/components/header'
import SearchInput from '@/components/search-input'
import { Button } from '@/components/Button'
import { FlatList, Text, View } from 'react-native'
import IdeaCard from '@/components/idea-card'

const Ideas = () => {

  const [enablePost, setEnablePost] = useState(false);

  return (
    <TabsContainer>
      <View className='px-6 pt-4'>
        <Header />
        <SearchInput placeholder='Procure uma ideia'/>
        <Button onPress={() => setEnablePost(!enablePost)} className='bg-blue-primary mx-auto rounded-full py-2 px-5'>
          <Text className='text-white font-semibold text-lg'>
            {!enablePost ? 'Publicar ideia' : 'Cancelar'}
          </Text>
        </Button>
      </View>
      <View className='px-10'>
        <FlatList 
          data={Array.from({ length: 5 })}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} 
          columnWrapperStyle={{ gap: 20, alignItems:"center",justifyContent:"center",marginTop: 20 }} 
          renderItem={({ item }) => (
              <IdeaCard
                enablePost={enablePost}
              />
          )}
        />
      </View>
    </TabsContainer>
  )
}

export default Ideas