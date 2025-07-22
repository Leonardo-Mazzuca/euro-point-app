import { get } from "@/service/helpers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";


export const useTeams = () => {

    const [teams, setTeams] = useState<Team[]>([]);

    const {data,isLoading,refetch} = useQuery({
        queryKey: ["teams"],
        queryFn: async () => {
            try {
                const req = await get("/teams/all") as Team[];
                return req;
            } catch (error: any) {
                console.log(error);
            }
        },
    });

    useEffect(() => {
        if(data) setTeams(data);
    }, [data]);

    return {
        teams,
        isLoading,
        refetch
    }
}