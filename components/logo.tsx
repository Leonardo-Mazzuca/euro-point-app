


import { Image } from 'react-native'
import React from 'react'

import {logo, logoLight} from '@/util/images'
import { useLayoutContext } from '@/context/layout-context'

const Logo = () => {

  const {theme} = useLayoutContext();

  const isDark = theme === "dark";

  return (
    <Image
      source={isDark ? logoLight : logo}
      className='w-[150px] h-[50px]'
      resizeMode='contain'
    />
  )
}

export default Logo