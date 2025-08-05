import z from "zod";



export const ideaSchema = z.object({
    title: z.string({ required_error: 'O título é indispensável!' }),
    content: z.string({ required_error: 'O conteúdo é indispensável!' }),
})

