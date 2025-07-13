import { get } from "@/service/helpers";
import { convertToProgramImage } from "@/util";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";


export const usePrograms = () => {

    const [programs, setPrograms] = useState<Program[]>([]);

    const {data,isLoading,refetch, isRefetching} = useQuery({
        queryKey: ["programs"],
        queryFn: async () => {
            try {
                const req = await get("/program/all") as Program[];
                return req;
            } catch (error: any) {
                console.log(error);
            }
        },
    }) ;

    useEffect(() => {
        if(data) setPrograms(data.map(d => ({
            ...d,
            image: convertToProgramImage(d.image)
        })));
    }, [data]);

    return {
        programs,
        refetch,
        isRefetching,
        isLoading
    }
}