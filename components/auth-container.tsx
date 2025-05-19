
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark-primary px-8 py-8">
      {children}
    </SafeAreaView>
  );
};

export default AuthContainer;
