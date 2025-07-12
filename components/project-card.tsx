


import React from 'react'
import { Card } from '@/components/Card'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import { router } from 'expo-router'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

type Props = {
  project:Project
}

const ProjectCard = ({project}: Props) => {

  const handleNavigate = () => {router.push(`/projects/${project.id}`)}
  
  return (
    <Card className="mt-4">
    <TouchableOpacity 
      onPress={handleNavigate} 
      className="p-2"
    >
      <View className="items-center flex-1 flex-row gap-5">
        {project.image ? (
          <Image
            className="w-[150px] h-[150px] rounded-2xl"
            source={{uri: project.image } }
          />
        ) : (
          <View className="w-[150px] h-[150px] bg-gray-200 rounded-2xl" />
        )}
        <View className='flex-1'>
          <View className="gap-2">
            <Text className="font-bold dark:text-white text-2xl">{project.title}</Text>
            <Text className="font-normal dark:text-gray-300 text-gray-500">
              Por {project?.user?.username}
            </Text>
          </View>

          <View className="mt-3 gap-2 items-center justify-between flex-row">
              <View className="flex-row">
                  <Text className="font-semibold text-blue-primary dark:text-blue-600">{project?.area?.name}</Text>
                  <Entypo name="dot-single" size={18} color="grey" />
                  <Text className="text-gray-500 dark:text-gray-400">
                    {dayjs(project.created_at).fromNow()} 
                  </Text>
              </View>
                <TouchableOpacity className='me-2'>
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