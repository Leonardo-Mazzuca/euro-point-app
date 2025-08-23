
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { Colors } from '@/constants/Colors'
import { AntDesignProps } from '.'
import { useLayoutContext } from '@/context/layout-context'

const PlusIcon = ({color,...rest}:AntDesignProps) => {

  const {theme} = useLayoutContext();

  const isDark = theme === "dark";
  const iconColor = color ? color : isDark ? Colors.dark.primaryYeallow : Colors.light.primaryBlue

  return (
    <Entypo {...rest} size={32} color={iconColor} name="plus" />
  )
}

export default PlusIcon