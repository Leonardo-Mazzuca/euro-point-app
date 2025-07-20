import { get, post } from "@/service/helpers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";


export const useNewsletter = () => {
    const [newsletters, setNewsletters] = useState<Newsletter[]>([]);

    const {data,isLoading,refetch, isRefetching} = useQuery({
        queryKey: ["newsletters"],
        queryFn: async () => {
            try {
                const req = await get("/newsletter/all") as Newsletter[];
                return req;
            } catch (error: any) {
                console.log(error);
            }
        },
    }) ;

    useEffect(() => {
        if(data) setNewsletters(data);
    }, [data]);

    const newNewsletter = async (data:NewsletterCreate) => {
        try {

            await post('/newsletter', data)
            Toast.show({
                type: 'success',
                text1: "Newsletter criada com sucesso!"
            })
            
        } catch (error:any) {
           Toast.show({
               type: 'error',
               text1: "Erro ao criar newsletter"
           }) 
        }
    }

    return {
        newsletters,
        refetch,
        isRefetching,
        isLoading,
        newNewsletter
    }
}