import { createContext, useContext, useEffect, useState } from "react"

type IdeaState = {
    ideas: Idea[]
    setIdeas: React.Dispatch<React.SetStateAction<Idea[]>>;
}

const IdeaContext = createContext<IdeaState | undefined>(undefined);

const IdeaProvider = ({children}:{children:React.ReactNode}) => {

    const [ideas, setIdeas] = useState<Idea[]>([]);

    useEffect(()=> {
        setIdeas([
            {
              user_id: 1,
              id: 1,
              title: "Assistente Virtual com IA para Atendimento Farmacêutico",
              description:
                "Criação de um chatbot com IA (como GPT) integrado ao sistema da farmácia, capaz de tirar dúvidas sobre medicamentos, interações, posologia, e até redirecionar para um farmacêutico humano.\n\nInovação: Atendimento 24h, melhora a experiência do cliente e reduz a carga dos atendentes.",
            },
            {
              user_id: 1,
              id: 2,
              title: "Sistema de Prescrição Digital com Blockchain",
              description:
                "Plataforma segura de prescrição médica digital, que utiliza blockchain para registrar e autenticar as receitas.\n\nInovação: Evita fraudes, facilita a conferência em farmácias e permite o rastreio seguro do histórico do paciente.",
            },
            {
              user_id: 1,
              id: 3,
              title: "App de Adesão ao Tratamento com Gamificação",
              description:
                "Aplicativo que envia lembretes de horário de medicação, permite registro de sintomas e recompensa usuários que seguem corretamente o tratamento.\n\nInovação: Reduz abandono de tratamento e melhora o engajamento do paciente com sua saúde.",
            },
            {
              user_id: 1,
              id: 4,
              title: "Entrega por Drones de Medicamentos Controlados",
              description:
                "Sistema de entrega por drones para áreas de difícil acesso, com verificação biométrica ou facial para liberar medicamentos controlados.\n\nInovação: Aumenta o alcance da farmácia e garante segurança no transporte de medicamentos sensíveis.",
            },
            {
              user_id: 1,
              id: 5,
              title: "Análise Preditiva de Estoque com IA",
              description:
                "Ferramenta que usa inteligência artificial para prever demanda de medicamentos com base em histórico de vendas, sazonalidade, surtos de doenças, etc.\n\nInovação: Evita faltas ou excessos no estoque, reduz perdas por vencimento e melhora o planejamento logístico.",
            },
          ]);
    },[])

    const value = {
        ideas,
        setIdeas
    }

    return (
        <IdeaContext.Provider value={value}>
            {children}
        </IdeaContext.Provider>
    )
}

const useIdeasContext = () => {
    const context = useContext(IdeaContext);
    if (!context) {
      throw new Error("useIdeasContext must be used within a IdeaProvider");
    }
    return context;
  };

  export {
    IdeaProvider,
    useIdeasContext
  }