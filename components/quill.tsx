import React from "react";
import { View } from "react-native";
import {MarkdownTextInput, parseExpensiMark} from '@expensify/react-native-live-markdown';


type QuillProps = {};

const Quill = ({}: QuillProps) => {
  const [text, setText] = React.useState('Hello, *world*!');
  return (
    <View className="flex-1">
      <MarkdownTextInput
        value={text}
        onChangeText={setText}
        parser={parseExpensiMark}
      />
    </View>
  );
};

export default Quill;
