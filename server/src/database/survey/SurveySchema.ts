import mongoose, { Document, Schema } from 'mongoose';
import { SurveyQuestion } from '../../types/survey/SurveyQuestion';
import { SurveyStatus } from '../../types/survey/SurveyStatus';

const OptionSchema = new Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
  },
  { _id: false },
);

const QuestionSchema = new Schema(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    type: { type: String, enum: ['multiple-choice'], required: true },
    options: { type: [OptionSchema], required: true },
  },
  { _id: false },
);

const SurveySchema = new Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ['draft', 'published', 'closed'],
    required: true,
  },
  questions: { type: [QuestionSchema], required: true },
});

export interface SurveyModelSchema extends Document {
  title: string;
  status: SurveyStatus;
  questions: SurveyQuestion[];
}

export const SurveyModel = mongoose.model<SurveyModelSchema>(
  'Survey',
  SurveySchema,
);
