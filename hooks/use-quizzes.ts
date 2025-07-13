import { get } from "@/service/helpers";
import { convertToQuizImage } from "@/util";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";



export const useQuizzes = () => {

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    const {data,isLoading,refetch, isRefetching} = useQuery({
        queryKey: ["quizzes"],
        queryFn: async () => {
            try {
                const req = await get("/quiz/all") as Quiz[];
                return req;
            } catch (error: any) {
                console.log(error);
            }
        },
    }) ;

    useEffect(()=> {
        if(data) setQuizzes(data.map(d => ({
            ...d,
            image: convertToQuizImage(d.image)
        })));
    },[data])

    return {
        quizzes,
        refetch,
        isRefetching,
        isLoading
    }
}