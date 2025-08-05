import { useEffect, useMemo, useState } from "react";
import { useQuizzes } from "./use-quizzes";
import { useQuizContext } from "@/context/quiz-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useRunningQuiz = ({ quizId }: { quizId: string }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isWrong, setIsWrong] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const { quizzes, onQuizFinish, onNextQuestion } = useQuizzes();
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answeredQuestionsStatus, setAnsweredQuestionsStatus] = useState<
    ("success" | "error" | null)[]
  >([]);
  const [quizData, setQuizData] = useState({
    totalRights: 0,
    totalErrors: 0,
    totalPoints: 0,
  });
  const [openAdviceModal, setOpenAdviceModal] = useState(false);
  const { setQuizCurrentQuestion } = useQuizContext();

  useEffect(() => {
    const current = quizzes.find((quiz) => quiz.id === Number(quizId));
    if (current) {
      setCurrentQuiz(current);
    }
  }, [quizzes]);

  const currentQuizMemo = useMemo(() => currentQuiz, [currentQuiz]);

  useEffect(() => {
    const questions = currentQuizMemo?.questions || [];
    if (questions) {
      setQuizQuestions(questions);
    }
  }, [currentQuizMemo]);

  const handleQuestionStatus = async () => {
    if (selectedAnswer) {
      const currentCorrectAnswer = currentQuestion?.correct_answer;
      const isRight =
        selectedAnswer.toLowerCase() === currentCorrectAnswer?.toLowerCase();

      setAnsweredQuestionsStatus((prev) => {
        const updated = [...prev];
        updated[currentStep - 1] = isRight ? "success" : "error";
        return updated;
      });

      if (currentQuestion) {
        if (isRight) {
          await AsyncStorage.setItem("totalRights", String(quizData.totalRights + 1));
          await AsyncStorage.setItem("totalPoints", String(quizData.totalPoints + currentQuestion?.total_points));
          setQuizData((prev) => ({
            ...prev,
            totalRights: prev.totalRights + 1,
            totalPoints: prev.totalPoints + currentQuestion?.total_points,
          }));
        } else {
          await AsyncStorage.setItem("totalErrors", String(quizData.totalErrors + 1));
          setQuizData((prev) => ({
            ...prev,
            totalErrors: prev.totalErrors + 1,
          }));
        }
      }
    }
  };

  const handleFinishButton = async () => {
    setIsSubmitted(true);

    if (selectedAnswer !== currentQuestion?.correct_answer) {
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
      }, 1000);
    } 

    if(currentQuizMemo) {
      if (currentStep >= (currentQuizMemo?.questions.length)) {
        setIsFinished(true);
        if(!currentQuiz) return;
        await onQuizFinish(quizData.totalPoints,currentQuiz?.id);
        return;
      }
  
      setTimeout(async () => {
        if(!currentQuiz) return;
        await onNextQuestion(currentQuiz?.id);
        setCurrentStep((prev) => prev + 1);
        setIsSubmitted(false);
        await handleQuestionStatus();
        setSelectedAnswer("");
      }, 1000);
    }

  };

  const handleQuizExit = () => {
    setOpenAdviceModal(true);
  }

  useEffect(()=> {
    if(currentQuestion){
      setQuizCurrentQuestion(currentQuestion);
    }
  },[currentQuestion])

  useEffect(() => {
    if (!currentQuiz || !currentQuiz.questions || currentQuiz.current_question_index === null || currentQuiz.current_question_index === undefined) {
      return;
    }
    
    setCurrentStep(currentQuiz.current_question_index + 1);
    
  }, [quizQuestions, currentQuiz]);

  useEffect(()=> {
    setCurrentQuestion(quizQuestions[currentStep - 1]);
  },[quizQuestions,currentStep]);

  useEffect(()=> {
    const updateQuizData = async () => {
      const storagedPoints = await AsyncStorage.getItem("totalPoints");
      const storagedRights = await AsyncStorage.getItem("totalRights");
      const storagedErrors = await AsyncStorage.getItem("totalErrors");

        setQuizData({
          totalPoints: Number(storagedPoints) || 0,
          totalRights: Number(storagedRights) || 0,
          totalErrors: Number(storagedErrors) || 0
        })
 
    }

    updateQuizData()
  },[])

  return {
    currentStep,
    isWrong,
    isSubmitted,
    isFinished,
    selectedAnswer,
    currentQuestion,
    answeredQuestionsStatus,
    handleQuestionStatus,
    handleFinishButton,
    handleQuizExit,
    openAdviceModal,
    currentQuiz,
    setCurrentStep,
    setSelectedAnswer,
    currentQuizMemo,
    quizData,
    setOpenAdviceModal
  }

};
