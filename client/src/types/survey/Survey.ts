import { SurveyQuestion } from './SurveyQuestion'
import { SurveyStatus } from './SurveyStatus'

export interface Survey {
  _id: string
  title: string
  rewardPoints: number
  creationDate: Date
  status: SurveyStatus
  /**
   * Questions in the survey
   */
  questions: SurveyQuestion[]
}
