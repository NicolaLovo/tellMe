// Interface representing a single option in a multiple-choice question
interface SurveyQuestionOption {
  id: string;
  text: string;
}

// Type representing a survey question with an id, text, type, and options
export type SurveyQuestion = {
  id: string;
  question: string;
  type: 'multiple-choice';
  options: SurveyQuestionOption[];
};
