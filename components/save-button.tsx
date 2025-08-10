


import { TouchableOpacity } from 'react-native'
import React from 'react'

import { FontAwesome } from '@expo/vector-icons'
import { useLayoutContext } from '@/context/layout-context'
import { Colors } from '@/constants/Colors'
import { FooterItem } from './footer-item'

type Props = {
    isSaved: boolean
    disabled?: boolean
    onPress: () => void
    totalSaved: number
}

const SaveButton = ({
    isSaved,
    disabled,
    onPress,
    totalSaved
}:Props) => {

  const {theme} = useLayoutContext();

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
    {isSaved ? (
      <FooterItem
        icon={
          <FontAwesome
            name="bookmark"
            size={22}
            color={
              theme === "dark" ? Colors.dark.icon : Colors.light.icon
            }
          />
        }
        text={String(totalSaved)}
      />
    ) : (
      <FooterItem
        icon={
          <FontAwesome
            name="bookmark-o"
            size={22}
            color={
              theme === "dark" ? Colors.dark.icon : Colors.light.icon
            }
          />
        }
        text={String(totalSaved)}
      />
    )}
  </TouchableOpacity>
  );
}

export default SaveButton