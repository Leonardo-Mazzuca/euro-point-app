import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";
import { SafeAreaView } from "react-native-safe-area-context";

type QuillProps = {
  content: string,
  setContent: (value:string)=>void
}

const Quill = ({content,setContent}:QuillProps) => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: content,
    onChange: async () => {
      const html = await editor.getHTML(); 
      setContent(html);
    },
    
  
  });
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Quill;
