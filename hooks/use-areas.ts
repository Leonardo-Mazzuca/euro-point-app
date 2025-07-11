import { get } from "@/service/helpers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"

export const useAreas = () => {
    const [areas, setAreas] = useState<Area[]>([]);

    const { data, isLoading } = useQuery({
        queryKey: ["areas"],
        queryFn: async () => {
            try {
                const req = await get("/areas/all") as Area[];
                return req;
            } catch (error: any) {
                console.log(error);
            }
        },
    });

    useEffect(() => {
        if (data) setAreas(data);
    }, [data])


    return {
        areas,
        isLoading
    }
}