import { loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useAuth = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const formMethods = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const login = ({email,password}: z.infer<typeof loginSchema>) => {
        router.push("/(tabs)");
        setIsLoggedIn(true);
    }

    return {
        login,
        isLoggedIn,
        formMethods
    }
}