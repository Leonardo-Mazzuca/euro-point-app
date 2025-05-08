import React from "react";
import { View } from "react-native";
import { Input } from "@/components/Input";

type QuillProps = {
  value: string,
  setValue: (value: string) => void,
};

const Quill = ({setValue,value}: QuillProps) => {
  
  return (
    <View className="flex-1">
        <Input 
          numberOfLines={4}
          className="h-[200px]"
          value={value}
          onChangeText={(text) => setValue(text)}
        />
    </View>
  );
};

export default Quill;
