import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from '@expo/vector-icons/AntDesign';
import { cn } from "@/lib/utils";

type ImageUploaderProps = {
  image: string | null;
  setImage: (image: string | null) => void;
  onImageSet?: () => void;
  innerText?:string
  className?:string
};
const ImageUploader = ({ image, setImage, onImageSet, innerText = "Capa",className }: ImageUploaderProps) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      if(onImageSet) onImageSet();
    }
  };

  return (
    <TouchableOpacity 
        onPress={pickImage}
        className={cn("border items-center justify-center border-gray-500 border-dashed rounded-md p-3 h-[120px]",className)}
    >
      <View className="flex-row items-center justify-center gap-2">
        <Text className="font-normal text-gray-500 text-xl">
            {innerText}
        </Text>
        <AntDesign name="upload" size={24} color="grey" />
      </View>
      {image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      )}
    </TouchableOpacity>
  );
};

export default ImageUploader;
