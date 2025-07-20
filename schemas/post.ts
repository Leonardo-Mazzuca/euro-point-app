import { z } from 'zod';

enum PostFormEnum {
    newsletter = 'newsletter',
    post = 'post',
    project = 'project'
}

const singlePostSchema = z.object({
    title: z.string({ required_error: 'O título é indispensável!' }),
    content: z.string({ required_error: 'O conteúdo é necessário!' }),
    images: z.array(z.any(), { required_error: 'Insira ao menos 1 imagem!' })
})

const newsletterSchema = z.object({
    images: z.array(z.any(), { required_error: 'Insira ao menos 1 imagem!' }),
    title: z.string({ required_error: 'O título é necessário!' }),
    content: z.string({ required_error: 'O conteúdo é necessário!' })
})

const projectSchema = z.object({
    ...newsletterSchema.shape,
    team: z.array(z.string(), { required_error: 'Adicione ao menos 1 membro!' }),
})

const postSchema = z.discriminatedUnion('formType', [
    z.object({
        formType: z.literal(PostFormEnum.post),
        post: singlePostSchema

    }),
    z.object({
        formType: z.literal(PostFormEnum.project),
        project: projectSchema
    }),
    z.object({
        formType: z.literal(PostFormEnum.newsletter),
        newsletter: newsletterSchema
    })
]);



type PostCreateType = {
    formType: PostFormEnum;
    post: z.infer<typeof singlePostSchema>;
    project: z.infer<typeof projectSchema>;
    newsletter: z.infer<typeof newsletterSchema>;
}

export {
    PostCreateType,
    PostFormEnum,
    postSchema
}