import { loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useAuth = () => {


    const formMethods = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const login = async ({email,password}: z.infer<typeof loginSchema>) => {
        router.push("/(tabs)");
        await AsyncStorage.setItem("email", email);

    }

    return {
        login,
        formMethods
    }
}