import { get, post } from "@/service/helpers";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useLayoutContext } from "@/context/layout-context";
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const {saveItem,unSaveItem, getCurrentUser, currentUser} = useLayoutContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const req = (await get("/posts/all"));
        return req
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: error.response.data.message,
        })
      }
    },
  });

  useEffect(()=> {
    if(data) setPosts(data as Post[]);
  },[data])

  useEffect(()=> {
    const savedPostsIds = currentUser.saved_posts_ids
    if(savedPostsIds) setSavedPosts(posts.filter(post => savedPostsIds.includes(post.id)));
  },[currentUser, posts])

  const newPost = async (data: PostCreate) => {
    try {
      
      const req = await post("/posts",data)
      Toast.show({
        type: "success",
        text1: "Post criado com sucesso!",
      })
      return {
        success: true
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response.data.message,
      })
      return {
        success: false
      }
    }
  }
  
  const handleSave = async (id: number) => {

      await saveItem("post", id);
      await getCurrentUser();
      refetch();
    

  }

  const handleUnSave = async (id: number) => {

    await unSaveItem("post", id);
    await getCurrentUser();
    refetch();
  }

  return {
    posts,
    isLoading,
    refetch,
    newPost,
    handleSave,
    handleUnSave,
    savedPosts
  };
};
