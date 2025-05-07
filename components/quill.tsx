import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";

const Quill = () => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: "Start editing!",
  });
  return (
    <> 
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
    </>
  );
};

export default Quill;
