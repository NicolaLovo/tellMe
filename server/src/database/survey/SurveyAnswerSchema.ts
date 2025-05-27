import mongoose from 'mongoose';
import { SurveyQuestionAnswer } from '../../types/survey/answer/SurveyQuestionAnswer';

// Sub-schema for individual question answers
const SurveyQuestionAnswerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  answer: { type: String, required: true },
  type: {
    type: String,
    enum: ['multiple-choice'],
    required: true,
  },
});

// Main schema
const SurveyAnswerSchema = new mongoose.Schema(
  {
    _id: {
      surveyId: { type: String, required: true },
      uid: { type: String, required: true },
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    answers: {
      type: [SurveyQuestionAnswerSchema],
      required: true,
    },
  },
  {
    _id: false, // Since _id is manually defined as a composite key
  },
);

/**
 * Interface defining the Survey document shape in MongoDB
 */
export interface SurveyAnswerModelSchema extends Document {
  _id: {
    surveyId: string;
    uid: string;
  };
  creationDate: Date;
  answers: SurveyQuestionAnswer[];
}

/**
 * Mongoose model for Survey collection based on the SurveySchema
 */
export const SurveyAnswerModel = mongoose.model<SurveyAnswerModelSchema>(
  'SurveyAnswer',
  SurveyAnswerSchema,
);