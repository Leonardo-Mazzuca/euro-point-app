import { get, post } from "@/service/helpers";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const req = (await get("/posts/all")) as Post[];
        console.log(req);
        setPosts(req);
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: error.response.data.message,
        })
      }
    },
  });

  useEffect(()=> {
    if(data) setPosts(data);
  },[data])

  const newPost = async (data: PostCreate) => {
    try {
      
      const req = await post("/posts",data)
      Toast.show({
        type: "success",
        text1: "Post criado com sucesso!",
      })
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
    newPost
  };
};
