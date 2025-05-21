import { SurveyQuestion } from './SurveyQuestion';
import { SurveyStatus } from './SurveyStatus';

/**
 * Interface representing a survey
 */
export interface Survey {
  title: string;
  rewardPoints: number;
  creationDate: Date;
  status: SurveyStatus;
  questions: SurveyQuestion[];
}
