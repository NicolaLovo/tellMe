/**
 * Type representing aggregated survey results.
 */
export type QuizResults = {
  quizId: string;
  results: {
    questionId: string;
    type: 'rating';

    options: {
      optionId: '1' | '2' | '3' | '4' | '5';
      votes: number;
    }[];
  }[];
};
