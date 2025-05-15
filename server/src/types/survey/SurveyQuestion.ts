interface SurveyQuestionOption {
  id: string
  text: string
}

export type SurveyQuestion = {
  id: string
  question: string
  type: 'multiple-choice'
  options: SurveyQuestionOption[]
}
