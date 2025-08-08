import { useLayoutContext } from "@/context/layout-context";
import api from "@/service/api";
import { get, getToken, post } from "@/service/helpers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";


export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [savedProjects, setSavedProjects] = useState<Project[]>([]);
    const {currentUser} = useLayoutContext();

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
    }, [data]);

    const newProject = async (data:ProjectCreate) => {
        try {

            const formData = new FormData();
            formData.append('area_id', String(data.area_id));
            formData.append('title', data.title);
            formData.append('content', data.content);
            formData.append('image', {
                uri: data.image.uri,
                type: data.image.mimeType,
                name: data.image.fileName || `image_${Date.now()}.jpg`, 
            } as any);
            formData.append('team_id', String(data.team_id));
            formData.append('members_ids', JSON.stringify(data.members_ids));

            console.log(formData);
            
            const token = await getToken();
      
            await api.post("/projects", formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            });
            Toast.show({
                type: 'success',
                text1: "Projeto criado com sucesso!"
            })
            return {
                success: true
            }
            
        } catch (error) {
            console.log(error);
            
            Toast.show({
                type: 'error',
                text1: "Error ao criar projeto"
            })
            return {
                success: false
            }
        }
    }

    const getSingleProject = async (id:number):Promise<Project | null> => {
        try {

            const req = await get(`/projects/${id}`)
            console.log('Projeto sozinho: ', req);
            
            return req as Project
            
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: "Error ao buscar projeto"
            })
            return null;
        }
    }

    useEffect(()=> {
        const savedProjectsIds = currentUser.saved_projects_ids
        if(savedProjectsIds) setSavedProjects(projects.filter(project => savedProjectsIds.includes(project.id)));
    },[currentUser, projects])

    return {
        projects,
        isLoading,
        refetch,
        isRefetching,
        newProject,
        getSingleProject,
        savedProjects
    }
}