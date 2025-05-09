import React, { useEffect, useState } from "react";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import SearchInput from "@/components/search-input";
import { Button } from "@/components/Button";
import { FlatList, Text, View } from "react-native";
import IdeaCard from "@/components/idea-card";
import { useLayoutContext } from "@/context/layout-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { useIsFocused } from "@react-navigation/native";

const Ideas = () => {
  const [enablePost, setEnablePost] = useState(false);
  const { setPostButtonProps } = useLayoutContext();


  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setPostButtonProps({
        className: "bg-blue-primary",
        children: (
          <AntDesign size={24} color={Colors.light.primaryYeallow} name="plus" />
        ),
      });
    } else {
      setPostButtonProps({
        className: "bg-yeallow-primary",
        children: (
          <AntDesign size={24} color={Colors.light.primaryBlue} name="plus" />
        ),
      });
  
    }
  }, [isFocused]);

  useEffect(() => {
    if (enablePost) {
      setPostButtonProps({
        className: "bg-yeallow-primary",
        children: (
          <AntDesign size={24} color={Colors.light.primaryBlue} name="check" />
        ),
      });
    }
  }, [enablePost]);

  return (
    <TabsContainer>
      <View className="px-6 pt-4">
        <Header />
        <SearchInput placeholder="Procure uma ideia" />
        <Button
          onPress={() => setEnablePost(!enablePost)}
          className="bg-blue-primary mx-auto rounded-full py-2 px-5"
        >
          <Text className="text-white font-semibold text-lg">
            {!enablePost ? "Publicar ideia" : "Cancelar"}
          </Text>
        </Button>
      </View>
      <View className="px-10">
        <FlatList
          data={Array.from({ length: 5 })}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{
            gap: 20,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
          renderItem={({ item }) => <IdeaCard enablePost={enablePost} />}
        />
      </View>
    </TabsContainer>
  );
};

export default Ideas;
