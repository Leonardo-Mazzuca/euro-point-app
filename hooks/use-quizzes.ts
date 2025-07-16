import { get, put } from "@/service/helpers";
import { convertToQuizImage } from "@/util";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";



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

    const onQuizFinish = async (points: number) => {

        try {

            await put('/users',{total_points: points});
            Toast.show({
                type: 'success',
                text1: 'Quiz finalizado com sucesso'
            })
            
        } catch (error:any) {
            Toast.show({
                type: 'error',
                text1: error.message || 'Erro finalizando quiz'
            })
        }

    }

    const onQuizStart = async (quiz_id: number) => {
        try {

            await put(`/quiz/start/${quiz_id}`,{});
            Toast.show({
                type: 'success',
                text1: 'Quiz iniciado com sucesso'
            })
            
        } catch (error:any) {
            Toast.show({
                type: 'error', 
                text1: error.message || "Erro ao startar quiz"
            })
        }
    }

    const onQuizRunningDiscard = async (quiz_id: number) => {
        try {

            await put(`/quiz/discard/${quiz_id}`,{});
            refetch();
            Toast.show({
                type: 'success',
                text1: 'Quiz descartado com sucesso'
            })
            
        } catch (error:any) {
            Toast.show({
                type: 'error',
                text1: error.message || "Erro ao descartar quiz: " 
            })
        }
    }

    const onNextQuestion = async (quiz_id: number) => {
        try {
            await put(`/quiz/next/${quiz_id}`,{});
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: error.message || "Erro ao avançar para a próxima questão"
            })
        }
    }

    return {
        quizzes,
        refetch,
        isRefetching,
        isLoading,
        onQuizFinish,
        onQuizStart,
        onQuizRunningDiscard,
        onNextQuestion
    }
}