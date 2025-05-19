import { loginSchema } from "@/schemas/auth";
import { router } from "expo-router";
import { useState } from "react";
import { z } from "zod";

export const useAuth = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = ({email,password}: z.infer<typeof loginSchema>) => {
        router.push("/(tabs)");
        setIsLoggedIn(true);
    }

    return {
        login,
        isLoggedIn
    }
}