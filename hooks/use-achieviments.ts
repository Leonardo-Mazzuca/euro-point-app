
import { get } from '@/service/helpers';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';


export const useAchieviments = () => {

    const [achieviments, setAchieviments] = useState<Achieviment[]>([]);

    const {data,isLoading,refetch,isRefetching} = useQuery({
        queryKey: ["achieviments"],
        queryFn: async () => {
            try {
                const req = await get("/achieviment") as Achieviment[];
                return req;
            } catch (error: any) {
                console.log(error);
            }
        },
    });

    useEffect(() => {
        if(data) setAchieviments(data);
    }, [data]);

    return {
        achieviments,
        isLoading,
        refetch,
        isRefetching
    }
}