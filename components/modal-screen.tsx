import { Modal, ModalProps, TouchableWithoutFeedback, View } from "react-native";
import { Button } from "@/components/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BlurView } from 'expo-blur'
import { cn } from "@/lib/utils";
import { useLayoutContext } from "@/context/layout-context";
import { Colors } from "@/constants/Colors";

type IdeaModalProps = {
  idea?: Idea;
  header?: React.ReactNode
  wrapperClassNames?:string
  enableCloseButton?: boolean
} & ModalProps;

const ModalScreen = ({ header, children,onRequestClose,wrapperClassNames,enableCloseButton=true, ...rest }: IdeaModalProps) => {

  const {theme} = useLayoutContext();

  return (
    <Modal {...rest} animationType="fade" transparent>
      <TouchableWithoutFeedback>
          <BlurView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            tint="dark"
            intensity={100}
          >
            <View className="bg-white dark:bg-dark-card px-3 py-2 mx-auto my-auto rounded-xl min-w-[250px]">
              <View className="flex-row items-center justify-between">
                {header}
                {enableCloseButton && (
                  <Button
                    className="ms-auto"
                    onPress={onRequestClose}
                    variant={"ghost"}
                  >
                    <AntDesign name="close" color={theme === "dark" ? Colors.dark.icon : Colors.light.icon} size={24} />
                  </Button>
                )}
              </View>
              <View className={cn("min-w-[250px]",wrapperClassNames)}>
                {children}
              </View>
            </View>
          </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalScreen;
