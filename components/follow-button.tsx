import { Text } from "react-native";
import { Button } from "./Button";
import { AntDesign } from "@expo/vector-icons";
import { useLayoutContext } from "@/context/layout-context";
import { Colors } from "@/constants/Colors";

type Props = {
    isFollowing: boolean;
    handleFollow: () => void;
    handleUnFollow: () => void;
}
export const FollowButton = ({
    isFollowing,
    handleFollow,
    handleUnFollow,
}:Props) => {

    const { theme } = useLayoutContext();

    return (
      <Button
        onPress={isFollowing ? handleUnFollow : handleFollow}
        className="flex-row ms-auto w-[100px] gap-2 items-center"
        size={"icon"}
        variant="ghost"
      >
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

        {isFollowing ? (
          <AntDesign 
          name="check" 
          size={20} 
          color={
            theme === "dark"
              ? Colors.dark.primaryBlue
              : Colors.light.primaryBlue
          }
         />
        ) : (
          <AntDesign
            name="plus"
            size={20}
            color={
              theme === "dark"
                ? Colors.dark.primaryBlue
                : Colors.light.primaryBlue
            }
          />
        )}

      </Button>
    );
  };