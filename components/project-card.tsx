


import React from 'react'
import { Card } from '@/components/Card'
import { Text, TouchableOpacity, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import { router } from 'expo-router'
import "dayjs/locale/pt-br";
import { getHoursSinceCreatedAt, getProjectImage } from '@/util'
import ItemImage from './item-image'
import { projectFallBack } from '@/util/images'

type Props = {
  project:Project
}

const ProjectCard = ({project}: Props) => {

  const handleNavigate = () => {router.push(`/projects/${project.id}`)}

  const firstImage = getProjectImage(project);


  return (
    <Card className="mt-4">
    <TouchableOpacity 
      onPress={handleNavigate} 
      className="p-2"
    >
      <View className="items-center flex-1 flex-row gap-5">

          <ItemImage 
            url={firstImage}
            type="card"
            fallback={projectFallBack}
          />
         
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
                    {getHoursSinceCreatedAt(project.created_at)}
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