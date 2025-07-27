
import React, { useState } from 'react'
import ProfileContainer from '@/components/profile-container'
import ProfileHeader from '@/components/profile-header'
import CategoriesScroll from '@/components/categories-scroll'
import { View } from 'react-native'
import PostCard from '@/components/post-card'
import ScrollableList from '@/components/scrollable-list'
import { usePosts } from '@/hooks/use-posts'
import { useProjects } from '@/hooks/use-projects'
import { useNewsletter } from '@/hooks/use-newsletter'
import ProjectCard from '@/components/project-card'
import NewsLetterCard from '@/components/newsletter-card'

const Saved = () => {

  const categories = ["Avisos", "Projetos", "Newsletter"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const {refetch, savedPosts} = usePosts();
  const {savedProjects} = useProjects();
  const {savedNewsletters} = useNewsletter();


  const renderData = () => {
    switch(selectedCategory){
      case "Avisos":
        return savedPosts
      case "Projetos":
        return savedProjects
      case "Newsletter":
        return savedNewsletters
      default:
        return []
    }
  }

  const renderItem = (item: any)=> {
    switch (selectedCategory) {
      case "Avisos":
        return <PostCard refetch={refetch} post={item} />
      case "Projetos":
        return <ProjectCard project={item} />
      case "Newsletter":
        return <NewsLetterCard newsletter={item} />
      default:
        return null;
    }
  }

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
          className='mt-5'
        />
      
        <ScrollableList 
          //@ts-ignore
          data={renderData()}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(_, index) => index.toString()}
          handleScroll={()=>{}}
          contentContainerStyle={{paddingTop: 0, paddingBottom: 100}}
        />
      
      </View>
    </ProfileContainer>
  )
}

export default Saved