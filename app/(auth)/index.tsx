import React, { useState } from "react";
import AuthContainer from "@/components/auth-container";
import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs";
import { Text, View } from "react-native";
import { cn } from "@/lib/utils";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import Logo from "@/components/logo";

const Login = () => {
  const [currentScreen, setCurrentScreen] = useState<"sign-in" | "sign-up">("sign-in");

  return (
    <AuthContainer>
      <Tabs
        value={currentScreen}
        onValueChange={(e) => setCurrentScreen(e as "sign-in" | "sign-up")}
      >
        <TabsList className="flex-row w-full my-2">
          <TabsTrigger value="for-you" className="flex-1">
            <Text
              className={cn(
                "text-xl font-semibold",
                currentScreen === "sign-in"
                  ? "text-blue-500"
                  : "dark:text-white"
              )}
            >
              Login
            </Text>
          </TabsTrigger>
          <TabsTrigger value="following" className="flex-1">
            <Text
              className={cn(
                "text-xl font-semibold",
                currentScreen === "sign-up"
                  ? "text-blue-500"
                  : "dark:text-white"
              )}
            >
              Registrar-se
            </Text>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <View className="my-10 items-center justify-center">
        <Logo />
      </View>

      {currentScreen === "sign-in" && <SignIn />}
      {currentScreen === "sign-up" && <SignUp />}
    </AuthContainer>
  );
};

export default Login;
