import { QuizQuestionAnswer } from './QuizQuestionAnswer'

export type QuizAnswer =
  | {
      _id: string
      quizId: string
      uid: string
      creationDate: Date
      status: 'pending'
    }
  | {
      _id: string
      quizId: string
      uid: string
      creationDate: Date
      status: 'completed'
      answers: QuizQuestionAnswer[]
    }
