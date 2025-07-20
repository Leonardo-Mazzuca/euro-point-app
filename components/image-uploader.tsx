import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { cn } from "@/lib/utils";

type ImageUploaderProps = {
  image: string[] | string | null;
  setImage: (image: string[] | string | null) => void;
  onImageSet?: () => void;
  innerText?: string;
  className?: string;
  allowMultipleSelection?: boolean;
};

const ImageUploader = ({
  image,
  setImage,
  onImageSet,
  innerText = "Capa",
  className,
  allowMultipleSelection,
}: ImageUploaderProps) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: allowMultipleSelection, 
    });
  
    if (!result.canceled) {
      const uri = result.assets[0].uri;
  
      if (allowMultipleSelection) {
        //@ts-ignore
        setImage((prev) => {
          const current = Array.isArray(prev) ? prev : prev ? [prev] : [];
          return [...current, uri];
        });
      } else {
        setImage(uri);
      }
  
      if (onImageSet) onImageSet();
    }
  };

  return (
    <View className={cn("gap-2", className)}>
      {/* Botão */}
      <TouchableOpacity
        onPress={pickImage}
        className="border items-center justify-center border-gray-500 border-dashed rounded-md p-3 h-[120px]"
      >
        <View className="flex-row items-center justify-center gap-2">
          <Text className="font-normal text-gray-500 text-xl">{innerText}</Text>
          <AntDesign name="upload" size={24} color="grey" />
        </View>
      </TouchableOpacity>

      {/* Imagens renderizadas abaixo do botão */}
      {Array.isArray(image) ? (
        <View className="flex-row flex-wrap gap-3 mt-2">
          {image.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={{ width: 100, height: 100, borderRadius: 8 }}
            />
          ))}
        </View>
      ) : image ? (
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, borderRadius: 8, marginTop: 8 }}
        />
      ) : null}
    </View>
  );
};

export default ImageUploader;
