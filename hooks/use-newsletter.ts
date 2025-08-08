import { useLayoutContext } from "@/context/layout-context";
import api from "@/service/api";
import { get, getToken, post } from "@/service/helpers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";


export const useNewsletter = () => {
    const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
    const [savedNewsletters, setSavedNewsletters] = useState<Newsletter[]>([]);
    const {currentUser} = useLayoutContext();

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

        const formData = new FormData();

        formData.append('area_id', String(data.area_id));
        formData.append('title', data.title);
        formData.append('content', data.content);
        
        
        if(data.images){
            data.images.forEach((image, index) => {
            formData.append('images', {
                uri: image.uri,
                type: image.mimeType,
                name: image.fileName || `image_${index}_${Date.now()}.jpg`, 
            } as any);
            });
        }

        try {

            const token = await getToken();
      
            await api.post("/newsletter", formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            });

            Toast.show({
                type: 'success',
                text1: "Newsletter criada com sucesso!"
            })
            return {
                success: true
            }
            
        } catch (error:any) {
           Toast.show({
               type: 'error',
               text1: "Erro ao criar newsletter"
           }) 
           return {
               success: false
           }
        }
    }

    const getSingleNewsletter = async (id:number):Promise<Newsletter | null> => {
        try {
            const req = await get(`/newsletter/${id}`)
            return req as Newsletter
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: "Erro ao buscar newsletter"
            })
            return null;
        }
    }

    useEffect(()=> {
        const savedNewslettersIds = currentUser.saved_newsletter_ids
        if(savedNewslettersIds) setSavedNewsletters(newsletters.filter(newsletter => savedNewslettersIds.includes(newsletter.id)));
    },[currentUser, newsletters])

    return {
        newsletters,
        refetch,
        isRefetching,
        isLoading,
        newNewsletter,
        getSingleNewsletter,
        savedNewsletters
    }
}