import { Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/Checkbox";
import ViewIdeaModal from "../view-idea-modal";

type IdeaCardProps = {
  idea: Idea;
  enablePost: boolean;
  onSelect: (idea: Idea, checked: boolean) => void;
  checked: boolean
};

const IdeaCard = ({ enablePost, idea, onSelect, checked}: IdeaCardProps) => {
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
              checked={checked}
              onCheckedChange={(checked) => {
                onSelect(idea, checked)
              }}
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
