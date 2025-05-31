import { QuizQuestionAnswer } from "./QuizAnswer"

export type QuizAnswer =
  | {
      _id: {
        quizId: string
        uid: string
      }
      creationDate: Date
      status: 'pending'
    }
  | {
      _id: {
        quizId: string
        uid: string
      }
      creationDate: Date
      status: 'completed'
      answers: QuizQuestionAnswer[]
    }
