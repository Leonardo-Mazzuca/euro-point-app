import { useLayoutContext } from "@/context/layout-context";
import { getOpenAICredentials, openai } from "@/service/openai";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { format } from "date-fns";
import {groupBy} from 'lodash'

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.utc();


export const useAI = () => {


    const [isGenerating, setIsGenerating] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [output, setOutput] = useState("");
    const {currentUser} = useLayoutContext();
    const [messages, setMessages] = useState<Message[]>([]);
    const [groupedMessages, setGroupedMessages] = useState<GroupedMessages[]>([])
    const [times, setTimes] = useState(0);

    const getOpenAIResponse = async (quizCurrentQuestion: Question) => {

        const utilData = `
        Questão atual: ${JSON.stringify(quizCurrentQuestion)}
       `;

        try {
    
          const requestedPrompt = `
            Aja como um assistente divertido, provocativo e inteligente. 
            Seu objetivo é **NÃO DAR A RESPOSTA** diretamente. 
    
            ⚠️ Nunca revele a resposta.
            ✅ Seu papel é guiar o usuário com pistas, provocações e perguntas divertidas, como se fosse um professor brincalhão.
    
            Contexto do quiz:
            Usuário: ${currentUser.username}
            Questão: ${prompt}
    
            Informações úteis: ${utilData}
    
            Agora, escreva uma resposta curta, engraçada e provocativa que:
            - Dê pistas (sem entregar).
            - Incentive o usuário a pensar.
            - Faça uma pergunta instigante.
            - Use emojis se quiser.
            `;
    
          setIsGenerating(true);
    
          const {maxTokens,model} = getOpenAICredentials();
    
          const completion = await openai.completions.create({
            prompt: requestedPrompt,
            model: model,
            max_tokens: maxTokens,
            temperature: 0.9,
          });

          const currentDate = dayjs().utcOffset(-3);
    
          const time = currentDate.format("HH:mm");
          if(completion){
            const subject = completion.choices[0].text;
            setMessages((prev) => [
                ...prev,
                {
                  time,
                  userId: currentUser.id,
                  avatar: currentUser.avatar,
                  subject,
                  prompt,
                  createdAt: currentDate.toISOString(),
                },
              ]);
          }
        
          
        } catch (error) {
          console.log("Erro ao gerar texto com IA", error);
        } finally {
          setIsGenerating(false);
        }
      }

      const handlePrompt = async (question: Question) => {
        if(prompt){
          await getOpenAIResponse(question);
        }
      }

      useEffect(()=>{
    
        if(messages && messages.length>0){
    
          const groupedList = Object.values(groupBy(messages,(m:Message)=> {
            return m?.createdAt?.substring(0,10)
          }))
    
          let data:GroupedMessages[] = []
          
          groupedList.map((day:any) => {
            let section = {
              title: format(new Date(day[0].createdAt), 'PPP'),
              data: [...day]
            }
    
            data.push(section)
           
          })
    
          setGroupedMessages(data)
    
     
        }
    
    
    
        
      },[messages])
    

    return {
        isGenerating,
        prompt,
        setPrompt,
        output,
        handlePrompt,
        groupedMessages
    }


}