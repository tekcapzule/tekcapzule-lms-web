export interface IValidateQuiz {
  courseId: string;
  quizId: string;
  userAnswers: IUserAnswer[]; 
}

export interface IUserAnswer {
  questionId: string;
  selectedAnswers: string[];
}