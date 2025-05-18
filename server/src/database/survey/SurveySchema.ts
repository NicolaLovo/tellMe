import mongoose, { Document, Schema } from 'mongoose';
import { SurveyQuestion } from '../../types/survey/SurveyQuestion';
import { SurveyStatus } from '../../types/survey/SurveyStatus';

// Schema for survey option
const OptionSchema = new Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
  },
  { _id: false },
);

// Schema for survey question
const QuestionSchema = new Schema(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    type: { type: String, enum: ['multiple-choice'], required: true },
    options: { type: [OptionSchema], required: true },
  },
  { _id: false },
);

// Main schema for survey
const SurveySchema = new Schema({
  title: { type: String, required: true },
  creationDate: { type: Date, required: true },
  rewardPoints: { type: Number, required: true },
  status: {
    type: String,
    enum: ['created', 'published', 'closed'],
    required: true,
  },
  questions: { type: [QuestionSchema], required: true },
});

// Interface defining the Survey document shape in MongoDB
export interface SurveyModelSchema extends Document {
  title: string;
  rewardPoints: number;
  creationDate: Date;
  status: SurveyStatus;
  questions: SurveyQuestion[];
}

// Mongoose model for Survey collection based on the SurveySchema
export const SurveyModel = mongoose.model<SurveyModelSchema>(
  'Survey',
  SurveySchema,
);
