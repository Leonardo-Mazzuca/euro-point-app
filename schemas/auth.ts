import { z } from "zod";

const loginSchema = z.object({
    email: z.string({ required_error: "O email é necessário!" }).email("Email inválido!"),
    password: z.string({ required_error: "A senha é indispensável!" }).min(6),
});

export {
    loginSchema
}