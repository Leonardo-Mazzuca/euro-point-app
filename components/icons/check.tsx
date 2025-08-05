


import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { AntDesignProps } from '.'
import { useLayoutContext } from '@/context/layout-context'

const CheckIcon = ({...rest}:AntDesignProps) => {

  const {theme} = useLayoutContext();

  const isDark = theme === "dark";
  const iconColor = isDark ? Colors.dark.primaryYeallow : Colors.light.primaryBlue

  return (
    <AntDesign size={24} color={iconColor} name="check" {...rest} />
  )
}

export default CheckIcon