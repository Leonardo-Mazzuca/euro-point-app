import { createContext, useContext, useState } from "react";


type QuizState = {
    quizCurrentQuestion: Question | null
    setQuizCurrentQuestion: (question: Question) => void
}

const QuizContext = createContext<QuizState | undefined>(undefined);

const QuizProvider = ({ children }: { children: React.ReactNode }) => {

    const [quizCurrentQuestion, setQuizCurrentQuestion] = useState<Question | null>(null);

    const value = {
        quizCurrentQuestion,
        setQuizCurrentQuestion
    }

    return (
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    );
};

const useQuizContext = () => {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error("useQuizContext must be used within a QuizProvider");
    }
    return context;
};

export {
    useQuizContext,
    QuizProvider
}