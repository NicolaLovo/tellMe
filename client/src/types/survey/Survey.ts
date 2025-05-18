import { SurveyQuestion } from './SurveyQuestion'
import { SurveyStatus } from './SurveyStatus'

export interface Survey {
  title: string
  creationDate: Date
  status: SurveyStatus
  questions: SurveyQuestion[]
}
