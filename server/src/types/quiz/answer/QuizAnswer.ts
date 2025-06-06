import { QuizQuestionAnswer } from './QuizQuestionAnswer';

export type QuizAnswer = {
  _id: string;
  quizId: string;
  uid: string;
  agencyId: string;
  creationDate: Date;
} & (
  | {
      status: 'pending';
    }
  | {
      status: 'completed';
      answers: QuizQuestionAnswer[];
    }
);
