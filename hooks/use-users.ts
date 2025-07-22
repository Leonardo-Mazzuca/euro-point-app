import { get } from "@/service/helpers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"


export const useUsers = () => {


    const [users,setUsers] = useState<User[]>();

    const {data,isLoading,refetch} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            try {
                const req = await get("/users/all") as User[];
                return req;
            } catch (error: any) {
                console.log(error);
            }
        },
    });

    useEffect(() => {
        if(data) setUsers(data);
    }, [data]);

    return {
        users,
        isLoading,
        refetch
    }
}