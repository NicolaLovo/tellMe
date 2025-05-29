export type QuizQuestion = {
  id: string;
  question: string;
  /**
   * Enumberative type of the questions.
   * Extend this type to add more question types in the future.
   * - `rating`: A question that expects a rating response from 1 to 5.
   */
  type: 'rating';
};
