import { QuizQuestion } from './QuizQuestion';

export interface Quiz {
  _id: string;
  agencyId: string;
  title: string;
  creationDate: Date;
  questions: QuizQuestion[];
}
