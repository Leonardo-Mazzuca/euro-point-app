import { CardContent, CardFooter, CardHeader } from "@/components/Card";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Text } from "@/components/Text";
import { Colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity, View } from "react-native";
import { useLayoutContext } from "@/context/layout-context";
import { useEffect, useState } from "react";
import { convertToAvatar, getNameInitials } from "@/util";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { post as api_post } from "@/service/helpers";
import Toast from "react-native-toast-message";
import ItemImage from "./item-image";
import { usePosts } from "@/hooks/use-posts";
import SaveButton from "./save-button";
import { FooterItem } from "./footer-item";
import { FollowButton } from "./follow-button";
import { LikeButton } from "./like-button";
import { useSave } from "@/hooks/use-save";
import { useDoubleTap } from "@/hooks/use-double-tap";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

type PostCardProps = {
  post: Post;
  refetch?: () => void;
  footerActions?: {
    enableSave: boolean,
    enableLike: boolean,
  }
};

const PostCard = ({ post, refetch, footerActions = {enableLike: true,enableSave: true} }: PostCardProps) => {
  const { theme } = useLayoutContext();

  const [isFollowing, setIsFollowing] = useState(false);
  const { currentUser, getCurrentUser } =
    useLayoutContext();

  const {handleSave, handleUnSave, likePost, updateViews} = usePosts();
  const [isLiked, setIsLiked] = useState(false);

  const {onDoublePress} = useDoubleTap({
    fn: () => likePost(post.id)
  })

  const {
    created_at,
    user,
    area: { contact_email },
    content,
    total_likes,
    total_views,
    area_id,
    total_saved
  } = post;

  useEffect(() => {
    if(currentUser){
      const following = currentUser?.followed_areas?.some(
        (area) => area.id === area_id
      );
      setIsFollowing(!!following);
    }
  }, [currentUser, area_id]);

  const {isSaved} = useSave({
    item: post,
    item_id_array: "saved_posts_ids"
  });

  useEffect(()=> {
    if(currentUser){
      const liked = currentUser?.liked_posts?.some((item) => item.post_id === post.id);
      setIsLiked(!!liked);
    }
  },[currentUser, post])

  useEffect(()=> {
    updateViews(post.id);
  },[])

  const handleFollow = async () => {
    try {
      await api_post("/areas/follow", { area_id });
      setIsFollowing(true);
      refetch && refetch();
      await getCurrentUser();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response.data.message,
      });
    }
  };

  const handleUnFollow = async () => {
    try {
      await api_post("/areas/unfollow", { area_id });
      refetch && refetch();
      setIsFollowing(false);
      await getCurrentUser();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response.data.message,
      });
    }
  };


  return (
    <TouchableOpacity onPress={onDoublePress} className="mt-4 rounded-2xl border dark:bg-dark-card border-gray-200 dark:border-zinc-800">
      <CardHeader>
        <View className="flex-row items-center gap-3">
          <Avatar className="w-10 h-10" alt="User image">
            <AvatarImage
              source={{
                uri: (user.avatar && convertToAvatar(user?.avatar)) || "",
              }}
            />
            <AvatarFallback>
              <Text>{getNameInitials(user?.username || "")}</Text>
            </AvatarFallback>
          </Avatar>
          {currentUser.id === post.user_id ? <Text className="font-semibold text-xl">Você</Text> : (
            <Text className="font-semibold text-xl">{user?.username}</Text>
          )}
          {post.user_id !== currentUser?.id &&
            <FollowButton 
            isFollowing={isFollowing} 
            handleFollow={handleFollow} 
            handleUnFollow={handleUnFollow} 
            />
          }
        </View>
      </CardHeader>
      <CardContent>
            
        {post.images[0] ? (
          <ItemImage fallback="" type="item" url={`${process.env.EXPO_PUBLIC_EUROPOINT_API_URL}/images/post/${post?.images[0].path}`} />
        ) : (
          <></>
        )}
     
        <PostText contact_email={contact_email} text={content} />
      </CardContent>
      <CardFooter className="gap-6">

        <LikeButton
          disabled={!footerActions?.enableLike}
          onPress={() => likePost(post.id)}
          totalLikes={total_likes}
          isLiked={isLiked}
        />

        <FooterItem
          icon={
            <Feather
              name="eye"
              size={22}
              color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
            />
          }
          text={String(total_views)}
        />
        <SaveButton
          disabled={!footerActions?.enableSave} 
          onPress={isSaved ? () => handleUnSave(post.id) : () => handleSave(post.id)}
          isSaved={isSaved}
          totalSaved={total_saved}
        />
        <Text className="ms-auto font-normal text-sm text-gray-400">
          {dayjs(created_at).fromNow()}
        </Text>
      </CardFooter>
    </TouchableOpacity>
  );
};


const PostText = ({
  text,
  contact_email,
}: {
  text: string;
  contact_email: string;
}) => {
  return (
    <View className="my-2">
      <Text className="text-gray-600 font-medium dark:text-gray-200">{text}</Text>
      <Text className="text-gray-500 dark:text-gray-200 my-2">
        Duvidas:{" "}
        <Text className="font-bold text-gray-600 dark:text-gray-200">
          {contact_email}
        </Text>
      </Text>
    </View>
  );
};

export default PostCard;
