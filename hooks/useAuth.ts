import { loginSchema } from "@/schemas/auth";
import { postNoAuth } from "@/service/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Toast from 'react-native-toast-message'
import { useLayoutContext } from "@/context/layout-context";
import { useState } from "react";

export const useAuth = () => {

    const {setCurrentUser} = useLayoutContext();
    const [userToken, setUserToken] = useState("");
    const formMethods = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const login = async ({email,password}: z.infer<typeof loginSchema>) => {
        
            const data = {
                email,
                password
            }

            try {
                
                const res = await postNoAuth("/auth/login", data) as LoginPayload;

                if(res.token){
                    await AsyncStorage.setItem("token", res.token);
                    setUserToken(res.token);
                }

                Toast.show({
                    type: 'success',
                    text1: res.message
                });

                setCurrentUser(res.user);
                router.push('/(tabs)');
                
            } catch (error:any) {
                console.log('Error in login', error.message);
                
                Toast.show({
                    type: 'error',
                    text1: error.response.data.message || "Error on login" 
                });
            }

    }
    
    const logout = async () => {
        await AsyncStorage.removeItem("token");
        router.push("/(auth)");
        Toast.show({
            type: 'success',
            text1: 'Logout realizado com sucesso'
        })
    }

    return {
        login,
        formMethods,
        logout,
        userToken
    }
}