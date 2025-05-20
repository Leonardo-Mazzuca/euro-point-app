
import AuthContainer from "@/components/auth-container";
import { View } from "react-native";
import SignIn from "./sign-in";
import Logo from "@/components/logo";

const Login = () => {

  return (
    <AuthContainer>
      <View className="my-10 items-center justify-center">
        <Logo />
      </View>

      <SignIn />
    </AuthContainer>
  );
};

export default Login;
