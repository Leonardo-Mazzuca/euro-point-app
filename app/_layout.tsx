import "../style/global.css";
import { useFonts } from "expo-font";
import {  router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { LayoutProvider, useLayoutContext } from "@/context/layout-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IdeaProvider } from "@/context/idea-context";
import { SocketProvider } from "@/context/socket-context";
import { useAuth } from "@/hooks/useAuth";
import { AuthProvider } from "@/context/auth-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const DefaultLayout = () => {

  const {isLogged, currentUser} = useLayoutContext();
  const {logout} = useAuth();

  useEffect(()=> {

    // const handleUser = async () => {
    //   if(!currentUser.id) {
    //     await logout();
    //   }
    // }

    // handleUser();
    
    if(isLogged) {
      router.push("/(tabs)");
    } 

  },[isLogged, currentUser]);

  return (


      <Stack>
        <Stack.Screen name="(splash)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(profile)" options={{ headerShown: false }} />
        <Stack.Screen name="post-screen" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>

  );
};


const InnerBar = () => {
    
  const {theme} = useLayoutContext();
  const isDarkMode = theme === "dark";
  
  return (
    <StatusBar 
      style={"light"}
      backgroundColor={isDarkMode ? "#000" : Colors.light.primaryBlue} 
    />

  )
}

export default function RootLayout() {

  
  const [loaded] = useFonts({
    'Inter-Black': require('../assets/fonts/Inter-Black.otf'),
    'Inter-BlackItalic': require('../assets/fonts/Inter-BlackItalic.otf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.otf'),
    'Inter-BoldItalic': require('../assets/fonts/Inter-BoldItalic.otf'),
    'Inter-ExtraBold': require('../assets/fonts/Inter-ExtraBold.otf'),
    'Inter-ExtraBoldItalic': require('../assets/fonts/Inter-ExtraBoldItalic.otf'),
    'Inter-ExtraLight-BETA': require('../assets/fonts/Inter-ExtraLight-BETA.otf'),
    'Inter-ExtraLightItalic-BETA': require('../assets/fonts/Inter-ExtraLightItalic-BETA.otf'),
    'Inter-Italic': require('../assets/fonts/Inter-Italic.otf'),
    'Inter-Light-BETA': require('../assets/fonts/Inter-Light-BETA.otf'),
    'Inter-LightItalic-BETA': require('../assets/fonts/Inter-LightItalic-BETA.otf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.otf'),
    'Inter-MediumItalic': require('../assets/fonts/Inter-MediumItalic.otf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.otf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.otf'),
    'Inter-SemiBoldItalic': require('../assets/fonts/Inter-SemiBoldItalic.otf'),
    'Inter-Thin-BETA': require('../assets/fonts/Inter-Thin-BETA.otf'),
    'Inter-ThinItalic-BETA': require('../assets/fonts/Inter-ThinItalic-BETA.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const client = new QueryClient();

  return (
    <GestureHandlerRootView className="flex-1">
       <QueryClientProvider client={client}>
        <AuthProvider>
          <LayoutProvider>
            <SocketProvider>
              <IdeaProvider>
                <DefaultLayout />
                <InnerBar />
                <Toast />
              </IdeaProvider>
            </SocketProvider>
          </LayoutProvider>
        </AuthProvider>
       </QueryClientProvider>

    </GestureHandlerRootView>
  );
}
