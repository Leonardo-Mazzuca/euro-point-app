import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/header";
import Feather from "@expo/vector-icons/Feather";
import { Card } from "@/components/Card";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/back-button";
import { useNewsletter } from "@/hooks/use-newsletter";
import { getHoursSinceCreatedAt, getNewsletterImage } from "@/util";
import Loading from "@/components/loading";
import ItemImage from "@/components/item-image";
import { newsletterFallback } from "@/util/images";
import { useLayoutContext } from "@/context/layout-context";
import { FooterItem } from "@/components/footer-item";
import { LikeButton } from "@/components/like-button";
import SaveButton from "@/components/save-button";


const SingleNewsletter = () => {
  const { id } = useLocalSearchParams();
  const handleBack = () => router.back();

  const [currentNewsletter, setCurrentNewsletter] = useState<Newsletter | null>(null);
  const [image, setImage] = useState("");
  const {getSingleNewsletter, isLoading,handleSave,handleUnSave} = useNewsletter();
  const [isSaved, setIsSaved] = useState(false);
  const {currentUser} = useLayoutContext();
  const [isLiked, setIsLiked] = useState(false);

  const getNewsletter = async () => {
    const current = await getSingleNewsletter(Number(id));
    if(current){
      setCurrentNewsletter(current);
    }
  }

    useEffect(()=> {
      if(currentNewsletter){
        const liked = currentUser.liked_newsletters.some((item) => item.newsletter_id === currentNewsletter.id);
        setIsLiked(!!liked);
      }
  },[currentUser, currentNewsletter])

  useEffect(() => {
    if(currentNewsletter){
      const itemIsSaved = currentUser?.saved_newsletter_ids?.includes(currentNewsletter.id);
      setIsSaved(!!itemIsSaved);
      getNewsletter();
    }
  }, [currentUser, currentNewsletter]);


  useEffect(()=> {
    getNewsletter();
  },[]);
  
  useEffect(()=> {
      if(currentNewsletter){
        setImage(getNewsletterImage(currentNewsletter));
      }
  },[currentNewsletter])

  if(isLoading){
    return <Loading />
  }

  return (
    <SafeAreaView className="flex-1 dark:bg-dark-primary">
      <Header leftChild={<BackButton handleBack={handleBack} />} hideProfile hideLine />

      <View className="p-5">
        <Card className="p-3 border border-gray-200">
          <ItemImage
            type="item"
            url={image}
            fallback={newsletterFallback}
          />

          <View className="flex-row items-center mt-3">
            <Text className="font-semibold dark:text-white text-xl">
              {currentNewsletter?.title}
            </Text>
            <Entypo name="dot-single" size={20} color="grey" />
            <Text className="text-gray-500 dark:text-gray-400">
              {getHoursSinceCreatedAt(currentNewsletter?.created_at as string)}
            </Text>
          </View>
          <Text className="my-3 dark:text-white text-md font-normal text-gray-500">
            {currentNewsletter?.content}
          </Text>

          <View className="gap-6 flex-row">
            <LikeButton
              onPress={()=>{}}
              totalLikes={currentNewsletter?.total_likes as number}
              isLiked={isLiked}
            />
            <FooterItem
              icon={<Feather name="eye" size={22} color="grey" />}
              text={currentNewsletter?.total_views.toString() as string}
            />
            <SaveButton
              isSaved={isSaved}
              onPress={isSaved ? () => handleUnSave(currentNewsletter?.id!) : () => handleSave(currentNewsletter?.id!)}
              totalSaved={currentNewsletter?.total_saved as number}
            />
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default SingleNewsletter;
