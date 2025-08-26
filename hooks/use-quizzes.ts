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

    const onQuizFinish = async (total_points: number,total_right_answers: number, quiz_id: number) => {

        try {

            const body = {
                total_points,
                total_right_answers
            }
            
            await put('/users',{total_points: total_points});
            await put (`/quiz/end/${quiz_id}`,body);
            refetch();
            
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
  
            Toast.show({
                type: 'success',
                text1: 'Quiz descartado com sucesso'
            })

            await refetch();
            
        } catch (error:any) {
            Toast.show({
                type: 'error',
                text1: error.message || "Erro ao descartar quiz: " 
            })
        }
    }

    const onNextQuestion = async (points: number, total_rights: number, quiz_id: number) => {
        try {

            const body = {
                points,
                total_rights
            }

            await put(`/quiz/next/${quiz_id}`,body);
            refetch()
        } catch (error: any) {
            console.log('Erro passando para a próxima questão');
            
            Toast.show({
                type: 'error',
                text1: error.message || "Erro ao avançar para a próxima questão"
            })
        }
    }

    const getRunningQuizzes = async ():Promise<Quiz[] | null> => {
        try {

            const runnings: RunningQuiz[] = await get("/quiz/runnings") as RunningQuiz[];
            return runnings.map(r => {
                r.quiz.image = convertToQuizImage(r.quiz.image);
                return r.quiz
            }) as Quiz[]
            
        } catch (error) {
            console.log("Erro pegando quizzes que estão rodando: ", error);
            return null
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
        onNextQuestion,
        getRunningQuizzes
    }
}