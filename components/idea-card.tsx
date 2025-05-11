import { Text, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "@/components/Checkbox";
import ModalScreen from "@/components/modal-screen";
import BackButton from "@/components/back-button";
import DeleteButton from "@/components/delete-button";

type IdeaCardProps = {
  idea?: Idea;
  enablePost: boolean;
};

const IdeaCard = ({ enablePost, idea }: IdeaCardProps) => {
  const [markCard, setMarkCard] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [text, setText] = useState(`
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, orci nec auctor cursus, purus sapien fermentum libero, ac gravida ligula mi vel tortor. Integer sed ipsum eget risus ultricies pharetra. Nulla facilisi. Etiam sit amet nisi augue. Sed vitae gravida metus. Aliquam erat volutpat. Aenean maximus sollicitudin eros, vel auctor magna malesuada nec. Ut at tincidunt urna. Fusce bibendum risus vel velit gravida, eu condimentum sapien efficitur.

  Sed ac libero in lorem tincidunt egestas. Nam vitae ex ut purus fermentum iaculis. Integer tempus ligula non magna lobortis convallis. Nunc non quam ac metus faucibus tempus. Mauris vitae volutpat lorem. Cras eu odio non lorem eleifend posuere. Ut maximus turpis ac nulla volutpat, nec sollicitudin nulla vestibulum. Morbi lacinia, nisl sed auctor fermentum, libero leo laoreet justo, non posuere magna turpis nec urna. Nam ut mauris neque. Aliquam nec efficitur lectus. Aenean tincidunt, velit ac suscipit sodales, tortor risus elementum neque, in hendrerit ex ante ut eros.

  Donec viverra dui purus, a porttitor magna ultricies sit amet. Etiam a orci nisl. Vivamus sit amet ante ut nulla iaculis aliquam. Phasellus pellentesque condimentum metus id porttitor. Proin varius turpis eu erat tincidunt, sed laoreet arcu suscipit. Donec nec efficitur urna, nec egestas ante. Suspendisse potenti. Nulla ac gravida leo. Etiam vel tortor urna. Quisque ut erat ut nulla volutpat auctor. Nam dictum nulla eu ante vulputate, non dapibus elit suscipit. Nulla facilisi.

  Sed ut tincidunt purus. Suspendisse potenti. Mauris vestibulum risus nec eros feugiat, vitae feugiat nisi laoreet. Donec cursus, ipsum at vehicula malesuada, lorem tortor sodales orci, in interdum ante dui vitae orci. Curabitur nec dui ut arcu viverra faucibus et eget nisi. Aliquam suscipit velit id orci maximus, ac rhoncus ligula interdum. Ut eu ante nulla. Nam rhoncus orci ut erat fermentum, vel vehicula velit feugiat. Duis scelerisque, purus at tincidunt aliquam, turpis leo faucibus sem, nec fringilla urna eros sed ante.

  Phasellus consectetur lobortis justo ac vulputate. Integer tristique urna sit amet erat vehicula, sed tincidunt sem vestibulum. Integer vel nulla ac ipsum vulputate lobortis non eget purus. Donec vel risus lacus. Sed mollis ultricies ligula, vel placerat leo scelerisque id. Vivamus interdum eu neque eget auctor. Nam sit amet congue justo. Cras sit amet magna et risus consectetur facilisis ac in nulla. Integer ut convallis urna. Curabitur sed nisi orci. Nam vehicula sollicitudin lorem, non vulputate odio venenatis non.

  Integer malesuada neque nisi, at fermentum felis fringilla nec. Vestibulum laoreet sapien vitae ligula lobortis posuere. Cras faucibus enim ac risus fermentum, id dictum libero tempor. Etiam a metus in nunc tincidunt maximus id in augue. Pellentesque fringilla id erat sit amet laoreet. Proin euismod est vitae massa sollicitudin, a porttitor lorem volutpat. Sed sit amet fermentum risus. Curabitur auctor, ipsum sit amet porttitor scelerisque, odio magna auctor neque, vel faucibus purus mi ac nulla. Nulla facilisi. Cras eu nulla at nunc ultricies dapibus. Mauris interdum arcu eu sem dictum volutpat. Ut ac nulla at neque venenatis aliquet at vel tortor.
`);


  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const handleDelete = () => {}

  return (
    <>
    
      <TouchableOpacity
        className={"bg-blue-secondary dark:bg-blue-primary gap-3 rounded-2xl p-3 flex-1"}
        onPress={handleOpen}
      >
        <View className="flex-row">
          <Text className="text-xl dark:text-white font-semibold">Title</Text>
          {enablePost && (
            <Checkbox
              className="ms-auto"
              checked={markCard}
              onCheckedChange={(markCard) => setMarkCard(markCard)}
            />
          )}
        </View>
        <Text className="dark:text-gray-300">Adasdasdsadsadsadasdasdsdasdsadsadadadsadsad</Text>
      </TouchableOpacity>

      <ModalScreen 
        visible={openModal}
        onRequestClose={handleClose}
        wrapperClassNames="w-[300px] h-[700px]"
        header={
        <View className="flex-row items-center justify-between">
          <BackButton handleBack={handleClose} />
          <DeleteButton handleDelete={handleDelete} />
        </View>
        }

      >
        <Text className="text-2xl dark:text-white font-semibold">
          Product management
        </Text>
        <ScrollView>
          <TextInput
          multiline
          value={text}
          onChangeText={setText}
          className="dark:text-gray-300"
        />
        </ScrollView>

      </ModalScreen>
    
    </>
  );
};

export default IdeaCard;
