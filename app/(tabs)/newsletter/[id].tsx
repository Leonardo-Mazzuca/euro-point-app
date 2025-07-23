import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/header";
import Feather from "@expo/vector-icons/Feather";
import { Card } from "@/components/Card";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FooterItem } from "@/components/post-card";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/back-button";
import { useNewsletter } from "@/hooks/use-newsletter";
import { getHoursSinceCreatedAt } from "@/util";
import Loading from "@/components/loading";
import ItemImage from "@/components/item-image";

const SingleNewsletter = () => {
  const { id } = useLocalSearchParams();
  const handleBack = () => router.back();

  const [currentNewsletter, setCurrentNewsletter] = useState<Newsletter | null>(null);
  const {getSingleNewsletter, isLoading} = useNewsletter();

  useEffect(()=> {
    const getNewsletter = async () => {
      const current = await getSingleNewsletter(Number(id));
      console.log(current);
      
      if(current){
        setCurrentNewsletter(current);
      }
    }

    getNewsletter();
  },[]);

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
            url={currentNewsletter?.images[0] as string}
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
            <FooterItem
              icon={
                <AntDesign name="heart" size={20} color={Colors.dark.hearthRed} />
              }
              text={currentNewsletter?.total_likes.toString() as string}
            />
            <FooterItem
              icon={<Feather name="eye" size={22} color="grey" />}
              text={currentNewsletter?.total_views.toString() as string}
            />
            <FooterItem
              icon={<FontAwesome name="bookmark-o" size={22} color="grey" />}
              text="82K"
            />
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default SingleNewsletter;
