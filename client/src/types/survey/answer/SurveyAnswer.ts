import { SurveyQuestionAnswer } from './SurveyQuestionAnswer'

export interface SurveyAnswer {
  /**
   * Unique identifier for the survey answer
   * is a composite key consisting of surveyId and uid
   * so that each user can only answer a survey once
   */
  _id: {
    surveyId: string
    uid: string
  }
  creationDate: Date
  /**
   * Answers to the survey questions
   */
  answer: SurveyQuestionAnswer[]
}
