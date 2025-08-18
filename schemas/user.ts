import z from "zod";



const userEditSchema = z.object({
    username: z.string({ required_error: 'O username é indispensável!' }),
    area_id: z.string({ required_error: 'A area é indispensável!' }),
    email: z.string({ required_error: 'O email é indispensável!' }),
    phone_number: z.string({ required_error: 'O telefone é indispensável!' }),
})

export {
    userEditSchema
}