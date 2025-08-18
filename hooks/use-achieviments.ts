


import { get, put } from '@/service/helpers';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

export enum AchievimentKey {
    FIRST_LOGIN,
    NO_ERRORS,
    MISS_ONE,
    REGISTERED_POST,
    REGISTERED_10_POST,
    REGISTERED_30_POST,
    EDIT_PROFILE,
    PLAYED_QUIZ,
    PLAYED_QUIZ_5,
    PLAYED_QUIZ_15,
    READ_PROGRAM,
    READ_5_PROGRAM,
    READ_15_PROGRAM,
    ASKED_BOT,
    LOGGED_10_TIMES_IN_ROW,
    LOGGED_50_TIMES_IN_ROW,
    LOGGED_100_TIMES_IN_ROW,
  }

export const useAchieviments = () => {

    const [achieviments, setAchieviments] = useState<Achieviment[]>([]);

    const {data,isLoading,refetch,isRefetching} = useQuery({
        queryKey: ["achieviments"],
        queryFn: async () => {
            try {
                const req = await get("/achieviment") as Achieviment[];
                return req;
            } catch (error: any) {
                console.log(error);
            }
        },
    });

    useEffect(() => {
        if(data) setAchieviments(data);
    }, [data]);

    const getAchievimentByKey = (key:AchievimentKey) => {
        try {

            const current = achieviments.find((item) => item.key === key);
            return current;
            
        } catch (error) {
            console.log(`Erro ao pegar conquista com chave: ${key}`, error);
            
        }
    }

    const updateAchieviment = async (key: AchievimentKey, progress: number) => {

        const currentAchieviment = getAchievimentByKey(key);
        if(!currentAchieviment){
            return
        }

        try {
            await put(`/achieviment/${key}`, {
                progress
            });
            Toast.show({
                type: 'success',
                text1: "Conquista concluída!",
                text2: currentAchieviment.title
            });
        } catch (error) {
            console.log(`Erro ao atualizar conquista com chave: ${key}`, error);
        }
    }

    return {
        achieviments,
        isLoading,
        refetch,
        isRefetching,
        getAchievimentByKey,
        updateAchieviment
    }
}