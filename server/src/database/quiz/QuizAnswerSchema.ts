import mongoose, { Document } from 'mongoose';
import { QuizQuestionAnswer } from '../../types/quiz/answer/QuizQuestionAnswer';

const QuizQuestionAnswerSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },
    optionId: {
      type: String,
      enum: ['1', '2', '3', '4', '5'],
      required: true,
    },
    type: { type: String, enum: ['rating'], required: true },
  },
  { _id: false },
);

const QuizAnswerSchema = new mongoose.Schema(
  {
    quizId: { type: String, required: true },
    uid: { type: String, required: true },
    agencyId: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      required: true,
    },
    answers: {
      type: [QuizQuestionAnswerSchema],
      required: function (this: any) {
        return this.status === 'completed';
      },
    },
  },
  {
    timestamps: true,
  },
);

export interface QuizAnswerModelSchema extends Document {
  agencyId: string;
  quizId: string;
  uid: string;
  creationDate: Date;
  status: 'pending' | 'completed';
  answers?: QuizQuestionAnswer[];
}

export const QuizAnswerModel = mongoose.model<QuizAnswerModelSchema>(
  'QuizAnswer',
  QuizAnswerSchema,
);
