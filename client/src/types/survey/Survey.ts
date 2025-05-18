import { SurveyQuestion } from './SurveyQuestion'
import { SurveyStatus } from './SurveyStatus'

export interface Survey {
  title: string
  rewardPoints: number
  creationDate: Date
  status: SurveyStatus
  questions: SurveyQuestion[]
}
