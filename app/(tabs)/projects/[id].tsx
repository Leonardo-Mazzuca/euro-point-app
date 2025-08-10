

import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import Header from '@/components/header';
import { Card } from '@/components/Card';
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/components/back-button';
import { useProjects } from '@/hooks/use-projects';
import Loading from '@/components/loading';
import { getHoursSinceCreatedAt, getProjectImage } from '@/util';
import ItemImage from '@/components/item-image';
import { projectFallBack } from '@/util/images';

const SingleProject = () => {

    const { id } = useLocalSearchParams();
    const handleBack = () => router.back();

    const [currentProject, setCurrentProject] = useState<Project | null >(null);
    const [image, setImage] = useState("");

    const {isLoading, getSingleProject} = useProjects();

    useEffect(()=> {
      const getProject = async () => {
        const current = await getSingleProject(Number(id));
        if(current){
          setCurrentProject(current);
        }
      }
      getProject();
    },[]);

    useEffect(()=> {
      if(currentProject){
        setImage(getProjectImage(currentProject as Project));
      }
    },[currentProject])

    console.log('Image: ', image);
    

    if(isLoading){
      return <Loading />
    }
  
    return (
      <SafeAreaView className="flex-1 dark:bg-dark-primary">
        <Header leftChild={<BackButton handleBack={handleBack} />} hideProfile hideLine />
  
        <View className="p-5">
          <Card className="p-3 border border-gray-200">
            <ItemImage 
              url={image}
              fallback={projectFallBack}
              type="item"
            />
  
            <View className="flex-row items-center my-3">
              <Text className="font-semibold dark:text-white text-xl">
                {currentProject?.title}
              </Text>
              <Entypo name="dot-single" size={20} color="grey" />
              <Text className="text-gray-500 dark:text-gray-300">
                {getHoursSinceCreatedAt(currentProject?.created_at as string)}
              </Text>
            </View>
            <Text className='dark:text-white text-gray-600'>
              {currentProject?.content}
            </Text>
  
          </Card>
        </View>
      </SafeAreaView>
    );
}

export default SingleProject