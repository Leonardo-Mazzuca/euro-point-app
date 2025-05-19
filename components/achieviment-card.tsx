

import { View, Text, Image } from 'react-native'
import React from 'react'
import { achievimentPreview } from '@/util/images'
import * as Progress from 'react-native-progress';
import { Colors } from '@/constants/Colors';

type AchievimentCardProps = {
    achieviment:Achieviment
}

const AchievimentCard = ({achieviment}: AchievimentCardProps) => {


  const hasProgress = achieviment.progress > 0;
  const progressColor = hasProgress ? Colors.light.secondaryYeallow : Colors.light.softGray;

  return (
    <View className='flex-row p-3 items-center gap-3 dark:border-b-zinc-800 border-b-gray-300 border-b-2 bg-transparent rounded-none m-0'>
        <Image 
            source={achievimentPreview}
        />
        <View className='gap-3'>
            <Text className='font-semibold text-2xl dark:text-white'>
                {achieviment.title}
            </Text>
            <Progress.Bar 
                progress={achieviment.progress/100} 
                width={200} 
                height={12}
                color={progressColor}
                style={{
                    backgroundColor: !hasProgress ? Colors.light.softGray : Colors.light.tertiaryYeallow,
                }}
            />
            <Text className='font-medium text-lg dark:text-gray-400 text-gray-500'>
                {achieviment.description}   
            </Text>
        </View>
    </View>
  )
}

export default AchievimentCard