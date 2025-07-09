



declare global {

    type LoginPayload = {
        token: string,
        user: User,
        message: string
    }

}

export {}