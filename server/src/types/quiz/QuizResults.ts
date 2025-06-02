/**
 * Type representing aggregated survey results.
 */
export type QuizResults = {
  quizId: string;
  agencyId: string;
  title: string;
  results: {
    questionId: string;
    /**
     * Text of the question.
     */
    question: string;

    type: 'rating';

    options: {
      optionId: '1' | '2' | '3' | '4' | '5';
      votes: number;
    }[];
  }[];
};
