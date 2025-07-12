import { get } from "@/service/helpers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";


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

    return {
        newsletters,
        refetch,
        isRefetching,
        isLoading
    }
}