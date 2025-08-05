import { Text, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/Checkbox";
import ModalScreen from "@/components/modal-screen";
import BackButton from "@/components/back-button";
import DeleteButton from "@/components/delete-button";
import IdeaTag from "./idea-tag";
import ViewIdeaModal from "./view-idea-modal";

type IdeaCardProps = {
  idea: Idea;
  enablePost: boolean;
};

const IdeaCard = ({ enablePost, idea }: IdeaCardProps) => {
  const [markCard, setMarkCard] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [text, setText] = useState<string>("");

  useEffect(()=> {
    setText(idea.description)
  },[idea]);

  const handleOpen = () => setOpenModal(true);
  const handleDelete = () => {}

  return (
    <>
    
      <TouchableOpacity
        className={"bg-blue-secondary dark:bg-blue-primary gap-3 rounded-2xl p-3 flex-1"}
        onPress={handleOpen}
      >
        <View className="flex-row justify-between w-full">
          <Text numberOfLines={2} className="text-xl w-[300px] dark:text-white font-semibold">{idea.title}</Text>
          {enablePost && (
            <Checkbox
              checked={markCard}
              onCheckedChange={(markCard) => setMarkCard(markCard)}
            />
          )}
        </View>
        <Text className="dark:text-gray-300">{idea.description}</Text>
      </TouchableOpacity>

      <ViewIdeaModal
        handleDelete={handleDelete}
        idea={idea}
        open={openModal}
        setOpen={setOpenModal}
        setText={setText}
        text={text}
      />
    
    </>
  );
};

export default IdeaCard;
