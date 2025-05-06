


import React from 'react'
import { Card } from '@/components/Card'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import { router } from 'expo-router'

const ProjectCard = () => {

  const handleNavigate = () => {router.push('/projects/1')}
  
  return (
    <Card className="mt-4">
    <TouchableOpacity 
      onPress={handleNavigate} 
      className="p-2"
    >
      <View className="items-center flex-row gap-5">
        <Image
          className="w-[150px] h-[150px] rounded-2xl"
          source={{uri: "https://marcaspelomundo.com.br/wp-content/uploads/2025/01/IMG_7660-e1738353337221-875x1024.jpeg"}}
        />
        <View>
          <View className="gap-2">
            <Text className="font-bold text-2xl">Projeto X</Text>
            <Text className="font-normal text-gray-500">
              Por Livia Gallafrio
            </Text>
          </View>

          <View className="mt-3 gap-2 justify-between flex-row">
              <View className="flex-row">
                  <Text className="font-semibold text-blue-primary">TI</Text>
                  <Entypo name="dot-single" size={18} color="grey" />
                  <Text className="text-gray-500">
                      9 dias atrás
                  </Text>
          
              </View>
              <TouchableOpacity>
                   <Entypo name="dots-three-horizontal" size={20} color="grey" />
              </TouchableOpacity>

          </View>
        </View>
      </View>
    </TouchableOpacity>
  </Card>
  )
}

export default ProjectCard