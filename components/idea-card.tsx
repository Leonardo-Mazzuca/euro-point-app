import { Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "@/components/Checkbox";
import ModalScreen from "@/components/modal-screen";

type IdeaCardProps = {
  idea?: Idea;
  enablePost: boolean;
};

const IdeaCard = ({ enablePost, idea }: IdeaCardProps) => {
  const [markCard, setMarkCard] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <>
    
      <TouchableOpacity
        className={"bg-blue-secondary gap-3 rounded-2xl p-3 flex-1"}
        onPress={handleOpen}
      >
        <View className="flex-row">
          <Text className="text-xl font-semibold">Title</Text>
          {enablePost && (
            <Checkbox
              className="ms-auto"
              checked={markCard}
              onCheckedChange={(markCard) => setMarkCard(markCard)}
            />
          )}
        </View>
        <Text>Adasdasdsadsadsadasdasdsdasdsadsadadadsadsad</Text>
      </TouchableOpacity>

      <ModalScreen 
        visible={openModal}
        onRequestClose={handleClose}
      />
    
    </>
  );
};

export default IdeaCard;
