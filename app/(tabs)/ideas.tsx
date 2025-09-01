import React, { useCallback, useEffect, useState } from "react";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import SearchInput from "@/components/search-input";
import { Button } from "@/components/Button";
import { BackHandler, FlatList, Keyboard, Text, View } from "react-native";
import IdeaCard from "@/components/ideas/idea-card";
import { useLayoutContext } from "@/context/layout-context";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import PlusIcon from "@/components/icons/plus";
import CheckIcon from "@/components/icons/check";
import PostButton from "@/components/post-button";
import { cn } from "@/lib/utils";
import IdeaAlertModal from "@/components/ideas/idea-alert-modal";
import IdeaCreateModal from "@/components/ideas/idea-create-modal";
import { useIdeasContext } from "@/context/idea-context";
import Toast from "react-native-toast-message";
import PostIdea from "@/components/ideas/post-idea";

const Ideas = () => {
  const [enablePost, setEnablePost] = useState(false);
  const { setHideTabs } = useLayoutContext();
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { ideas, setIdeas } = useIdeasContext();
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);
  const [search, setSearch] = useState("");
  const [openPostModal, setOpenPostModal] = useState(false);
  const [selectedIdeas, setSelectedIdeas] = useState<Idea[]>([]);
  const { theme } = useLayoutContext();

  const isDark = theme === "dark";

  useEffect(() => {
    if (ideas) {
      setFilteredIdeas(ideas);
    }
  }, [ideas]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredIdeas(ideas);
      Keyboard.dismiss();
      return;
    }
    const filtered = ideas?.filter((idea) =>
      idea.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredIdeas(filtered);
  }, [search]);

  const isFocused = useIsFocused();

  const handlePost = () => {
    setEnablePost(!enablePost);
  };

  const handleOpenPostModal = () => {
    setOpenPostModal(true);
  };

  const openIdeaModal = () => {
    setOpenCreateModal(true);
  };

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

  const PostButtonItem = () => {
    if (!isFocused) return null;

    return (
      <PostButton
        className={cn("dark:bg-yeallow-primary")}
        onPress={enablePost ? handleOpenPostModal : openIdeaModal}
        disabled={enablePost && selectedIdeas.length === 0}
      >
        {enablePost ? (
          <CheckIcon
            color={
              isDark ? Colors.light.primaryBlue : Colors.light.primaryYeallow
            }
          />
        ) : (
          <PlusIcon
            color={
              isDark ? Colors.light.primaryBlue : Colors.light.primaryYeallow
            }
          />
        )}
      </PostButton>
    );
  };

  useEffect(() => {
    if (enablePost) {
      setHideTabs(true);
    } else {
      setHideTabs(false);
    }
  }, [enablePost]);

  const onSelect = (idea: Idea, checked: boolean) => {
    setSelectedIdeas((prev) => {
      if (checked) {
        return [...prev, idea];
      } else {
        return prev.filter((i) => i.id !== idea.id);
      }
    });
  };

  const submit = (idea: Idea) => {
    setIdeas((prev) => [...prev, idea]);
    Toast.show({
      type: "success",
      text1: "Ideia criada com sucesso",
    });
  };

  const onFinalize = () => {
    setSelectedIdeas([]);
    setEnablePost(false);
  };

  return (
    <TabsContainer postButton={<PostButtonItem />}>
      <View className="flex-1 px-10">
        <View className="pt-4">
          <Header />
          <SearchInput
            placeholder="Procure uma ideia"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Button
            onPress={!enablePost ? handlePost : onFinalize}
            className="bg-blue-primary dark:bg-dark-card mx-auto rounded-full my-3 py-2 px-5"
          >
            <Text className="text-white font-semibold text-lg">
              {!enablePost ? "Publicar ideia" : "Cancelar"}
            </Text>
          </Button>
        </View>
        <FlatList
          data={filteredIdeas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <IdeaCard
              checked={selectedIdeas.some((i) => i.id === item.id)}
              onSelect={onSelect}
              idea={item}
              enablePost={enablePost}
            />
          )}
          contentContainerStyle={{
            paddingBottom: 150,
            gap: 10,
          }}
        />
      </View>
      <IdeaAlertModal open={openAlertModal} setIsOpen={setOpenAlertModal} />
      <IdeaCreateModal
        open={openCreateModal}
        setIsOpen={setOpenCreateModal}
        submit={submit}
      />
      <PostIdea
        open={openPostModal}
        setOpen={setOpenPostModal}
        onFinalize={onFinalize}
      />
    </TabsContainer>
  );
};

export default Ideas;
