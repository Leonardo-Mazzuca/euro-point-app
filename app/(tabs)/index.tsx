
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { Text, View } from 'react-native'
import { cn } from '@/lib/utils'
import { Input } from '@/components/Input'
import AntDesign from '@expo/vector-icons/AntDesign';

const Home = () => {

  const [currentScreen, setCurrentScreen] = useState<HomeScreen>("for-you");

  return (
    <SafeAreaView>

      <Header />

      <View className='px-6'>

          <Tabs
            value={currentScreen}
            onValueChange={(e) => setCurrentScreen(e as HomeScreen)}
          >

            <TabsList className="flex-row w-full">
              <TabsTrigger value="for-you" className="flex-1">
                <Text className={cn('text-xl', currentScreen === "for-you" && "text-blue-500")}>Para você</Text>
              </TabsTrigger>
              <TabsTrigger value="following" className="flex-1">
                <Text className={cn('text-xl', currentScreen === "following" && "text-blue-500")}>Seguindo</Text>
              </TabsTrigger>
            </TabsList>

            <Input
             className='my-4 rounded-2xl'
             placeholder='Busque uma postagem...'
             suffixIcon={<AntDesign name="search1" size={24} color="grey" />}
             />

            <TabsContent value='for-you'>
              <Text>
                For you
              </Text>
            </TabsContent>

            <TabsContent value='following'>
              <Text>
                following
              </Text>
            </TabsContent>

          </Tabs>

      </View>

    </SafeAreaView>
  )
}

export default Home