import { get, getToken, postFormData, put } from "@/service/helpers";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useLayoutContext } from "@/context/layout-context";
import api from "@/service/api";
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

    const formData = new FormData();

    formData.append('area_id', String(data.area_id));
    formData.append('title', data.title);
    formData.append('content', data.content);
    data.images.forEach((image, index) => {
      formData.append('images', {
          uri: image.uri,
          type: image.mimeType,
          name: image.fileName || `image_${index}_${Date.now()}.jpg`, 
      } as any);
    });

    console.log(data.images);
    
    try {
      
      const token = await getToken();
      
      const req =  await api.post("/posts", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      Toast.show({
        type: "success",
        text1: "Post criado com sucesso!",
      })
      return {
        success: true
      }
    } catch (error: any) {
      console.log('Error:', error);
      
      Toast.show({
        type: "error",
        text1: error.response.data.message || "Erro ao criar post!",
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

  const likePost = async (id: number) => {
    try {

      await put(`/posts/like/${id}`,{});
      refetch();
      
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response.data.message,
      })
    }
  }

  const updateViews = async (id: number) => {
    try {
      await put(`/posts/views/${id}`,{});
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response.data.message,
      })
    }
  }

  return {
    posts,
    isLoading,
    refetch,
    newPost,
    handleSave,
    handleUnSave,
    savedPosts,
    likePost,
    updateViews
  };
};
