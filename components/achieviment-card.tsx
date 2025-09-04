

import { View, Text, Image } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { Colors } from '@/constants/Colors';
import { getAchievimentImages } from '@/util';

type AchievimentCardProps = {
    achieviment:Achieviment
}

const AchievimentCard = ({achieviment}: AchievimentCardProps) => {


  const hasProgress = achieviment.progress > 0;
  const progressColor = hasProgress ? Colors.light.secondaryYeallow : Colors.light.softGray;

  return (
    <View style={{elevation: 5}} className='flex-row dark:bg-zinc-800 bg-gray-100 p-3 items-center gap-3 rounded-xl my-3'>
        <Image 
            className='w-[70px] h-[70px]'
            source={getAchievimentImages(achieviment.key)}
        />
        <View className='gap-3'>
            <Text numberOfLines={2} className='w-[250px] font-semibold text-xl dark:text-white'>
                {achieviment.title}
            </Text>
            <View className='flex-row gap-2 items-center'>
                <Progress.Bar 
                    progress={achieviment.progress/100} 
                    width={200} 
                    height={12}
                    color={progressColor}
                    style={{
                        backgroundColor: !hasProgress ? Colors.light.softGray : Colors.light.tertiaryYeallow,
                    }}
                />
                <Text className='dark:text-white text-gray-700 font-semibold'>
                    {achieviment.progress}%
                </Text>
            </View>
            <Text numberOfLines={2} className='font-medium w-[250px] text-md dark:text-gray-400 text-gray-500'>
                {achieviment.description}   
            </Text>
            <Text className='text-md font-medium text-zinc-500 dark:text-zinc-600'>
                 <Text className='font-semibold text-xl text-blue-primary dark:text-yeallow-primary'>{achieviment.points}</Text> Pontos
            </Text>
        </View>
    </View>
  )
}

export default AchievimentCard