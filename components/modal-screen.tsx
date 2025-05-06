import { Modal, ModalProps, TouchableWithoutFeedback, View } from "react-native";
import { Button } from "@/components/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BlurView } from 'expo-blur'

type IdeaModalProps = {
  idea?: Idea;
} & ModalProps;

const ModalScreen = ({ onRequestClose, ...rest }: IdeaModalProps) => {
  return (
    <Modal  {...rest} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={onRequestClose}>
          <BlurView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            tint="dark"
            intensity={100}
          >
            <View className="bg-white px-2 mx-auto my-auto rounded-xl min-w-[250px] min-h-[250px]">
              <Button
                className="ms-auto"
                onPress={onRequestClose}
                variant={"ghost"}
              >
                <AntDesign name="close" color={"#000"} size={24} />
              </Button>
            </View>
          </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalScreen;
