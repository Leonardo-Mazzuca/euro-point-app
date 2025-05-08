import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { CodeBridge, RichText, Toolbar, useEditorBridge, useEditorContent } from "@10play/tentap-editor";
import { SafeAreaView } from "react-native-safe-area-context";

type QuillProps = {
  content: string,
  setContent: (value:string)=>void
  setError: ()=>void
}

const Quill = ({content,setContent,setError}:QuillProps) => {

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: content,
  });
  
  const editorContent = useEditorContent(editor, { type: 'html' });
  const textContent = useEditorContent(editor, { type: 'text' });

  useEffect(() => {
    editorContent && setContent(editorContent);
    console.log(textContent?.length);
    if ( textContent?.length === 0 ) {
      setError();
    }
  }, [editorContent,textContent]);
  
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
