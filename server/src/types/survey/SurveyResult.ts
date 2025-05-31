/**
 * Type representing aggregated survey results.
 */
export type SurveyResult = {
  surveyId: string;
  results: {
    questionId: string;
    options: {
      optionId: string;
      votes: number;
    }[];
  }[];
};
