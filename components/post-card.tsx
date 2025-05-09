import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Text } from "@/components/Text";
import Entypo from "@expo/vector-icons/Entypo";
import { Button } from "@/components/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useColorScheme, View } from "react-native";

type PostCardProps = {};

const PostCard = ({}: PostCardProps) => {

  const colorsScheme = useColorScheme();

  return (
    <Card className="mt-4">
      <CardHeader className="flex-row p-4 items-center gap-3">
        <Avatar className="w-10 h-10" alt="User image">
          <AvatarImage
            source={{
              uri: "https://avatars.githubusercontent.com/u/66306912?v=4",
            }}
          />
          <AvatarFallback>
            <Text>LM</Text>
          </AvatarFallback>
        </Avatar>
        <Text className="font-semibold text-xl">Macoco</Text>
        <Entypo name="dot-single" size={18} color="grey" />
        <Text className="font-normal text-lg text-gray-400">1 hora atrás</Text>
        <Button size={"icon"} variant="ghost">
          <AntDesign name="plus" size={28} color={Colors.light.primaryBlue} />
        </Button>
        <Button variant="ghost">
          <Text className="text-blue-primary font-normal text-xl">Seguir</Text>
        </Button>
      </CardHeader>
      <CardContent>
        <TextSample />
      </CardContent>
      <CardFooter className="gap-6">
        <FooterItem
          icon={<AntDesign name="heart" size={20} color={colorsScheme === "dark" ? Colors.dark.hearthRed : Colors.light.hearthRed} />}
          text="48.8k"
        />
        <FooterItem
          icon={<Feather name="eye" size={22} color={colorsScheme === "dark" ? Colors.dark.icon : Colors.light.icon} />}
          text="12M"
        />
        <FooterItem
          icon={<FontAwesome name="bookmark-o" size={22} color={colorsScheme === "dark" ? Colors.dark.icon : Colors.light.icon} />}
          text="82K"
        />
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

const TextSample = () => {
  return (
    <>
      <Text className="text-gray-600 dark:text-gray-200 my-2">Colaboradores(as),</Text>
      <Text className="text-gray-600 dark:text-gray-200">
        Atualizem seus dados no sistema interno até 30/04 (endereço, telefone,
        etc.). É essencial para mantermos tudo regularizado.
      </Text>
      <Text className="text-gray-500 dark:text-gray-200 my-2">
        Duvidas:{" "}
        <Text className="font-bold text-gray-600 dark:text-gray-200">rh@empresa.com.br</Text>
      </Text>
    </>
  );
};

export default PostCard;
