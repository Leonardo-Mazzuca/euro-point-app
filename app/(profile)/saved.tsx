
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
import Empty from '@/components/empty'

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

  const getRedirect = () => {
    switch(selectedCategory){
      case "Avisos":
        return { 
          redirect: '/(tabs)',
          redirectText: 'Ir para os avisos',
        }
      case "Projetos":
        return { 
          redirect: '/(tabs)/projects',
          redirectText: 'Ir para os projetos',
        }
      case "Newsletter":
        return { 
          redirect: '/(tabs)/newsletter',
          redirectText: 'Ir para os newsletters',
        }
      default:
        return { 
          redirect: '/(tabs)',
          redirectText: 'Ir para os avisos',
        }
      
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
          ListEmptyComponent={() => (
            <Empty
              title={"Parece que você não tem nenhum item salvo..."}
              subtitle={"Porque você não salva alguma coisa para ler depois?"}
              animationSource={require("../../assets/lottie/empty-saved.json")}
              redirect={getRedirect()?.redirect}
              redirectText={getRedirect()?.redirectText}
            />
          )}
        />
      
      </View>
    </ProfileContainer>
  )
}

export default Saved