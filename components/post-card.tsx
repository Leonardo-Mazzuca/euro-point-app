import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TouchableOpacity, View } from "react-native";
import { useLayoutContext } from "@/context/layout-context";
import { useEffect, useState } from "react";
import { convertToAvatar, getNameInitials, isValidUrl } from "@/util";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { post as api_post } from "@/service/helpers";
import Toast from "react-native-toast-message";
import ItemImage from "./item-image";
import { usePosts } from "@/hooks/use-posts";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

type PostCardProps = {
  post: Post;
  refetch: () => void;
};

const PostCard = ({ post, refetch }: PostCardProps) => {
  const { theme } = useLayoutContext();

  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { currentUser, getCurrentUser } =
    useLayoutContext();

  const {handleSave, handleUnSave} = usePosts();

  const {
    created_at,
    user,
    area: { contact_email },
    content,
    total_likes,
    total_views,
    area_id,
  } = post;

  useEffect(() => {
    if (currentUser?.followed_areas?.some((area) => area.id === area_id))
      setIsFollowing(true);
  }, []);

  useEffect(() => {
    const itemIsSaved = currentUser?.saved_posts_ids?.includes(post.id);
    setIsSaved(!!itemIsSaved);
  }, [currentUser, post.id]);

  const handleFollow = async () => {
    try {
      await api_post("/areas/follow", { area_id });
      setIsFollowing(true);
      refetch();
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
      setIsFollowing(false);
      refetch();
      await getCurrentUser();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response.data.message,
      });
    }
  };

  const FollowButton = () => {
    return (
      <Button
        onPress={isFollowing ? handleUnFollow : handleFollow}
        className="flex-row ms-auto w-[100px] gap-2 items-center"
        size={"icon"}
        variant="ghost"
      >
        <AntDesign
          name="plus"
          size={20}
          color={
            theme === "dark"
              ? Colors.dark.primaryBlue
              : Colors.light.primaryBlue
          }
        />
        <Text
          style={{
            color:
              theme === "dark"
                ? Colors.dark.primaryBlue
                : Colors.light.primaryBlue,
          }}
          className="font-normal text-xl"
        >
          {isFollowing ? "Seguindo" : "Seguir"}
        </Text>
      </Button>
    );
  };

  return (
    <Card className="mt-4">
      <CardHeader className="flex-row p-4 items-center gap-3">
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
        <Text className="font-semibold text-xl">{user?.username}</Text>
        <FollowButton />
      </CardHeader>
      <CardContent>
        {isValidUrl(post.images[0]) && (
          <ItemImage fallback="" type="item" url={post.images[0]} />
        )}
        <PostText contact_email={contact_email} text={content} />
      </CardContent>
      <CardFooter className="gap-6">
        <FooterItem
          icon={
            <AntDesign name="heart" size={20} color={Colors.dark.hearthRed} />
          }
          text={String(total_likes)}
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
        <TouchableOpacity onPress={isSaved ? () => handleUnSave(post.id) : () => handleSave(post.id)}>
          {isSaved ? (
            <FooterItem
              icon={
                <FontAwesome
                  name="bookmark"
                  size={22}
                  color={
                    theme === "dark" ? Colors.dark.icon : Colors.light.icon
                  }
                />
              }
              text={String(post.total_saved)}
            />
          ) : (
            <FooterItem
              icon={
                <FontAwesome
                  name="bookmark-o"
                  size={22}
                  color={
                    theme === "dark" ? Colors.dark.icon : Colors.light.icon
                  }
                />
              }
              text={String(post.total_saved)}
            />
          )}
        </TouchableOpacity>
        <Text className="ms-auto font-normal text-sm text-gray-400">
          {dayjs(created_at).fromNow()}
        </Text>
      </CardFooter>
    </Card>
  );
};

type FooterItemProps = {
  icon: React.ReactNode;
  text: string;
};

export const FooterItem = ({ icon, text }: FooterItemProps) => {
  return (
    <View className="items-center flex-row gap-2">
      {icon}
      <Text className="text-gray-600 dark:text-gray-100">{text}</Text>
    </View>
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
      <Text className="text-gray-600 dark:text-gray-200">{text}</Text>
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
