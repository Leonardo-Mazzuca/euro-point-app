import { TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/Card";
import { Text } from "./Text";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { getNewsletterImage, getStorageImageUrl } from "@/util";
import ItemImage from "./item-image";
import { newsletterFallback } from "@/util/images";
import SaveButton from "./save-button";
import { LikeButton } from "./like-button";
import { useSave } from "@/hooks/use-save";
import { useNewsletter } from "@/hooks/use-newsletter";
import { useDoubleTap } from "@/hooks/use-double-tap";
import { useLayoutContext } from "@/context/layout-context";

type Props = {
  newsletter: Newsletter;
};
const NewsLetterCard = ({ newsletter }: Props) => {
  const { isSaved } = useSave({
    item: newsletter,
    item_id_array: "saved_newsletter_ids",
  });
  const lastPress = useRef<number | null>(null)


  const { handleSave, handleUnSave, likeNewsletter } = useNewsletter();
  const { currentUser, getCurrentUser } = useLayoutContext();
  const [isLiked, setIsLiked] = useState(false);

  const handleNavigate = () => {
    router.push(`/newsletter/${newsletter.id}`);
  };

  useEffect(() => {
    if (currentUser) {
      const liked = currentUser.liked_newsletters.some(
        (item) => item.newsletter_id === newsletter.id
      );
      setIsLiked(!!liked);
    }
  }, [currentUser]);

  const firstImage = getNewsletterImage(newsletter);

  const imageUrl = newsletter?.images?.[0]
    ? newsletter.is_demo
      ? getStorageImageUrl(newsletter.images[0].path)
      : firstImage
    : "";

  return (
    <Card className="mt-4">
      <TouchableOpacity onPress={handleNavigate} className="p-2">
        <View className="items-center flex-row gap-5">
          <ItemImage type="card" url={imageUrl} fallback={newsletterFallback} />
          <View>
            <View className="gap-2">
              <Text className="font-bold w-[200px] text-md">
                {newsletter.title}
              </Text>
              <Text className="font-normal dark:text-gray-300 text-gray-500">
                Por {newsletter?.user?.username}
              </Text>
            </View>

            <View className="mt-3 gap-2 justify-between flex-row">
              <View className="flex-row">
                <Text className="font-semibold text-blue-primary">
                  {newsletter?.area?.name}
                </Text>
                <Entypo name="dot-single" size={18} color="grey" />
                <Text className="text-gray-500 dark:text-gray-400">
                  {dayjs(newsletter.created_at).fromNow()}
                </Text>
              </View>
            </View>
            <View className="flex-row gap-3 my-2">
              <LikeButton
                totalLikes={newsletter.total_likes}
                onPress={() => {
                  likeNewsletter(newsletter.id)
                  setIsLiked(!isLiked);
                }}
                isLiked={isLiked}
              />
              <SaveButton
                isSaved={isSaved}
                onPress={
                  isSaved
                    ? () => handleUnSave(newsletter.id)
                    : () => handleSave(newsletter.id)
                }
                totalSaved={newsletter.total_saved}
              />
              <TouchableOpacity>
                <Entypo
                  onPress={handleNavigate}
                  name="dots-three-horizontal"
                  size={20}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default NewsLetterCard;
