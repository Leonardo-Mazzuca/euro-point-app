import { get } from "@/service/helpers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";


export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    const {data,isLoading, refetch,isRefetching} = useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            try {
                const req = await get("/projects/all") as Project[];
                return req;
            } catch (error: any) {
                console.log(error);
            }
        },
    })

    useEffect(() => {
        if(data) setProjects(data);
    }, [data])

    return {
        projects,
        isLoading,
        refetch,
        isRefetching
    }
}