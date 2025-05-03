

import React, { useState } from 'react'
import TabsContainer from '@/components/tabs-container'
import Header from '@/components/header'
import { Input } from '@/components/Input'
import { Animated } from 'react-native'
import CategoriesScroll from '@/components/categories-scroll'



const Newsletter = () => {

  const categories = ['Para você', 'TI', 'RH', 'Corporativo', 'Interno'];
  const [selected, setSelected] = useState(categories[0]);

  return (
    <TabsContainer>
      <Header/> 
      <Animated.View className="px-6 pt-4">
        <CategoriesScroll 
          categories={categories}
          selected={selected}
          setSelected={setSelected} 
        />
        <Input />
      </Animated.View>
    </TabsContainer>
  )
}

export default Newsletter