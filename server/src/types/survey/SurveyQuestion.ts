interface SurveyQuestionOption {
  id: string;
  text: string;
}

export type SurveyQuestion = {
  id: string;
  question: string;
  /**
   * Enumberative type of the questions.
   * Extend this type to add more question types in the future.
   */
  type: 'multiple-choice';
  options: SurveyQuestionOption[];
};
