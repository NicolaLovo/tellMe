/**
 * Type representing aggregated survey results.
 */

export type SurveyResult = {
  surveyId: string
  surveyTitle: string
  results: {
    questionId: string
    questionText: string
    options: {
      optionId: string
      optionText: string
      votes: number
    }[]
  }[]
}
