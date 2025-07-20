import { get } from "@/service/helpers";
import { convertToProjectImage } from "@/util";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";


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
        if(data) setProjects(data.map(d => ({
            ...d,
            image: convertToProjectImage(d.image)
        })));
    }, [data]);

    const newProject = async (data:ProjectCreate) => {
        try {
            
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: "Error ao criar projeto"
            })
        }
    }

    return {
        projects,
        isLoading,
        refetch,
        isRefetching,
        newProject
    }
}