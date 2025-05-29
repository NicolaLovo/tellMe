import mongoose from 'mongoose';
import { QuizQuestion } from '../../types/quiz/QuizQuestion';

const QuizQuestionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    type: { type: String, enum: ['rating'], required: true },
  },
  { _id: false },
);

const QuizSchema = new mongoose.Schema(
  {
    agencyId: { type: String, required: true },
    title: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    questions: { type: [QuizQuestionSchema], required: true },
  },
  {
    timestamps: true,
  },
);

/**
 * Interface defining the Quiz document shape in MongoDB
 */
export interface QuizModelSchema extends Document {
  agencyId: string;
  title: string;
  creationDate: Date;
  questions: QuizQuestion[];
}

/**
 * Mongoose model for Quiz collection based on the QuizSchema
 */
export const QuizModel = mongoose.model<QuizModelSchema>('Quiz', QuizSchema);
