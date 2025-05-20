import React, { useCallback, useEffect, useState } from "react";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import SearchInput from "@/components/search-input";
import { Button } from "@/components/Button";
import { BackHandler, FlatList, Text, View } from "react-native";
import IdeaCard from "@/components/idea-card";
import { useLayoutContext } from "@/context/layout-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";
import ModalScreen from "@/components/modal-screen";

const Ideas = () => {
  const [enablePost, setEnablePost] = useState(false);
  const { setPostButtonProps, setHideTabs } = useLayoutContext();
  const [openAlertModal, setOpenAlertModal] = useState(false);


  const handlePost = () => {
    setHideTabs(true);
    setEnablePost(!enablePost);
  }

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (enablePost) {
          setOpenAlertModal(true);
          return true;
        }
        return false;
      };
  
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
  
      return () => subscription.remove();
    }, [enablePost])
  );
  

  useEffect(() => {
    if (enablePost) {
      setPostButtonProps({
        className: "bg-yeallow-primary",
        children: (
          <AntDesign size={24} color={Colors.light.primaryBlue} name="check" />
        ),
      });
    } else {
      setHideTabs(false)
      setPostButtonProps({
        className: "bg-blue-primary",
        children: (
          <AntDesign size={24} color={Colors.light.primaryYeallow} name="plus" />
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
          onPress={handlePost}
          className="bg-blue-primary dark:bg-dark-card mx-auto rounded-full py-2 px-5"
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
      <ModalScreen 
        visible={openAlertModal}
        onRequestClose={() => setOpenAlertModal(false)}
        wrapperClassNames="w-[300px] h-[100px]"
      >
        <Text className="dark:text-white font-semibold text-xl">
          Ops!
        </Text>
        <Text className="dark:text-gray-200 font-medium text-lg">
          Você não pode sair dessa tela enquanto estiver publicando uma ideia!
        </Text>
      </ModalScreen>
    </TabsContainer>
  );
};

export default Ideas;
