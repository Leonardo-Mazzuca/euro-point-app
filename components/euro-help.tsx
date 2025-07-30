


import { View, Text } from 'react-native'
import React from 'react'
import { useLayoutContext } from '@/context/layout-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export const EuroHelpLogo = () => {
    return (
      <View className="rounded-full p-2 bg-blue-tertiary/5 dark:bg-blue-tertiary/20">
        <MaterialCommunityIcons
          name="robot-excited-outline"
          size={32}
          color={Colors.light.tertiaryBlue}
        />
      </View>
    );
  };

export const EuroHelp = () => {
    const { theme } = useLayoutContext();
  
    return (
      <View className="flex-row gap-1 items-center">
         <EuroHelpLogo />
        <View>
          <Text className="text-xl font-semibold dark:text-white">Euro Help</Text>
          <View className="flex-row gap-2 items-center">
            <View className="rounded-full w-[12px] h-[12px] bg-green-primary" />
            <Text className="text-gray-400">Ativo</Text>
          </View>
        </View>
      </View>
    );
  };
