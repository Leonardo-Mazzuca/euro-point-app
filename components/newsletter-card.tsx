import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card } from "@/components/Card";
import { Text } from "./Text";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { isValidUrl } from "@/util";
import ItemImage from "./item-image";
import { newsletterFallback } from "@/util/images";

type Props ={
  newsletter: Newsletter
}
const NewsLetterCard = ({newsletter}:Props) => {

  const handleNavigate = () => {
    router.push(`/newsletter/${newsletter.id}`);
  }

  const firstImage = newsletter.images?.[0]?.path ?
   `${process.env.EXPO_PUBLIC_EUROPOINT_API_URL}/images/newsletter/${newsletter.images?.[0]?.path }` : ""

  return (
    <Card className="mt-4">
      <TouchableOpacity 
        onPress={handleNavigate} 
        className="p-2"
      >
        <View className="items-center flex-row gap-5">
          
          <ItemImage
            type="card"
            url={firstImage}
            fallback={newsletterFallback}
          />
          <View>
            <View className="gap-2">
              <Text numberOfLines={2} className="font-bold w-[150px] text-2xl">{newsletter.title}</Text>
              <Text className="font-normal dark:text-gray-300 text-gray-500">
                Por {newsletter?.user?.username}
              </Text>
            </View>

            <View className="mt-3 gap-2 justify-between flex-row">
                <View className="flex-row">
                    <Text className="font-semibold text-blue-primary">{newsletter?.area?.name}</Text>
                    <Entypo name="dot-single" size={18} color="grey" />
                    <Text className="text-gray-500 dark:text-gray-400">
                      {dayjs(newsletter.created_at).fromNow()} 
                    </Text>
                </View>
                <TouchableOpacity>
                     <Entypo name="dots-three-horizontal" size={20} color="grey" />
                </TouchableOpacity>

            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default NewsLetterCard;
