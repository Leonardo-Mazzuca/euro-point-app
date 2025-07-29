import OpenAI from "openai";

export const openai = new OpenAI({
    apiKey:process.env.EXPO_PUBLIC_CHAT_GPT_API_KEY,
    dangerouslyAllowBrowser: true
});

export const getOpenAICredentials = () => {

    const model = process.env.EXPO_PUBLIC_CHAT_GPT_MODEL;
    const maxTokens = Number(process.env.EXPO_PUBLIC_CHAT_GPT_MAX_TOKEN);

    if (!model || !maxTokens) {
        throw new Error("Credênciais para o chat gpt estão faltando!");
    }

    return {
        model,
        maxTokens
    }

  }