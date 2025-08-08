import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { cn } from "@/lib/utils";

type ImageUploaderProps = {
  image: ExpoImageType[] | ExpoImageType | null;
  setImage: (image: ExpoImageType[] | ExpoImageType | null) => void;
  onImageSet?: () => void;
  innerText?: string;
  className?: string;
  allowMultipleSelection?: boolean;
};

const ImageUploader = ({
  image,
  setImage,
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

      if (allowMultipleSelection) {
        //@ts-ignore
        setImage((prevImages) => (prevImages ? [...prevImages, result.assets[0]] : [result.assets[0]]));
      } else {
        setImage({
           fileName: result.assets[0].fileName,
           mimeType: result.assets[0].mimeType,
           uri: result.assets[0].uri
        } as ExpoImageType);
      }
  
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
          {image.map((item, index) => (
            <Image
              key={index}
              source={{ uri: item.uri }}
              style={{ width: 100, height: 100, borderRadius: 8 }}
            />
          ))}
        </View>
      ) : image ? (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 100, height: 100, borderRadius: 8, marginTop: 8 }}
        />
      ) : null}
    </View>
  );
};

export default ImageUploader;
