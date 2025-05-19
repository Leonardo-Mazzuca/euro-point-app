
import React, { useState } from 'react'
import ProfileContainer from '@/components/profile-container'
import ProfileHeader from '@/components/profile-header'
import CategoriesScroll from '@/components/categories-scroll'
import { View } from 'react-native'
import PostCard from '@/components/post-card'
import ScrollableList from '@/components/scrollable-list'

const Saved = () => {

  const categories = ["Avisos", "Projetos", "Newsletter"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <ProfileContainer>
      <ProfileHeader 
        text='Items salvos'
      />
      <View className='px-6 gap-5'>
        <CategoriesScroll
          categories={categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />

        <ScrollableList 
          data={Array.from({ length: 5 })}
          renderItem={() => (
            <PostCard />
          )}
          keyExtractor={(_, index) => index.toString()}
          handleScroll={()=>{}}
          contentContainerStyle={{paddingTop: 0, paddingBottom: 100}}
        />
      
      </View>
    </ProfileContainer>
  )
}

export default Saved