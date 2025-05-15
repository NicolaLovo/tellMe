import { SurveyQuestion } from './SurveyQuestion'
import { SurveyStatus } from './SurveyStatus'

export interface Survey {
  title: string
  status: SurveyStatus
  questions: SurveyQuestion[]
}
