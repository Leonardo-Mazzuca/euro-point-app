import { Modal, ModalProps, TouchableWithoutFeedback, View } from "react-native";
import { Button } from "@/components/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BlurView } from 'expo-blur'
import { cn } from "@/lib/utils";

type IdeaModalProps = {
  idea?: Idea;
  header?: React.ReactNode
  wrapperClassNames?:string
} & ModalProps;

const ModalScreen = ({ header, children,onRequestClose,wrapperClassNames, ...rest }: IdeaModalProps) => {
  return (
    <Modal {...rest} animationType="fade" transparent>
      <TouchableWithoutFeedback>
          <BlurView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            tint="dark"
            intensity={100}
          >
            <View className="bg-white px-3 py-2 mx-auto my-auto rounded-xl min-w-[250px] min-h-[250px]">
              {header ? (
                header
              ) : (
                <Button
                  className="ms-auto"
                  onPress={onRequestClose}
                  variant={"ghost"}
                >
                  <AntDesign name="close" color={"#000"} size={24} />
                </Button>
              )}
              <View className={cn("min-w-[250px] min-h-[250px]",wrapperClassNames)}>
                {children}
              </View>
            </View>
          </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalScreen;
