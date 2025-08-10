import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { FooterItem } from "./footer-item";
import { Colors } from "@/constants/Colors";



type Props = {
    totalLikes: number
    disabled?: boolean
    onPress: () => void
    isLiked: boolean
}

export const LikeButton = ({onPress,totalLikes,disabled,isLiked}:Props) => (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <FooterItem
        icon={
          <AntDesign
            name={isLiked ? "heart" : "hearto"}
            size={20}
            color={isLiked ? Colors.dark.hearthRed : Colors.light.softGray}
          />
        }
        text={String(totalLikes)}
      />
    </TouchableOpacity>
  );