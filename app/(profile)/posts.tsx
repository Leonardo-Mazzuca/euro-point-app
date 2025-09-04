
import React, { useState } from 'react'
import ProfileContainer from '@/components/profile-container'
import ProfileHeader from '@/components/profile-header'
import ScrollableList from '@/components/scrollable-list';
import PostCard from '@/components/post-card';
import CategoriesScroll from '@/components/categories-scroll';
import { View } from 'react-native';
import { useAllPublications } from '@/hooks/use-all-publications';
import ProjectCard from '@/components/project-card';
import NewsLetterCard from '@/components/newsletter-card';
import Empty from '@/components/empty';

const MyPosts = () => {

  const categories = ["Avisos", "Projetos", "Newsletter"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const {currentUserNewsletters,currentUserPosts,currentUserProjects} = useAllPublications();

    const getItems = () => {
      switch (selectedCategory) {
        case "Avisos":
          return currentUserPosts;
        case "Projetos":
          return currentUserProjects;
        case "Newsletter":
          return currentUserNewsletters;
        default:
          return [];
      }
    }

    const renderItem = (item:any) => {
      switch (selectedCategory) {
        case "Avisos":
          return <PostCard post={item} />;
        case "Projetos":
          return <ProjectCard project={item} />;
        case "Newsletter":
          return <NewsLetterCard newsletter={item} />;
        default:
          return null;
      }
    }

    return (
      <ProfileContainer className='p-4'>
        <ProfileHeader 
          text='Minhas publicações'
        />
        <View className='px-2 gap-5'>
          <CategoriesScroll
            className='my-5'
            categories={categories}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
  
          <ScrollableList 
            //@ts-ignore
            data={getItems()}
            renderItem={({item,index})=>renderItem(item)}
            keyExtractor={(_, index) => index.toString()}
            handleScroll={()=>{}}
            contentContainerStyle={{paddingTop: 0, paddingBottom: 100}}
            ListEmptyComponent={() => (
              <Empty
                title={"Você ainda não registrou nada!"}
                subtitle={"É uma boa hora para começar não acha?"}
                animationSource={require("../../assets/lottie/empty-created.json")}
                redirectText='Criar!'
                redirect='/post-screen'
    
              />
            )}
          />
        
        </View>
      </ProfileContainer>
    
  )
}

export default MyPosts