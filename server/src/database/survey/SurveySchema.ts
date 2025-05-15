import mongoose, { Document, Schema } from 'mongoose';

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

export interface SurveySchema extends Document {
  title: string;
  status: 'draft' | 'published' | 'closed';
  questions: Array<{
    id: string;
    question: string;
    type: 'multiple-choice';
    options: Array<{
      id: string;
      text: string;
    }>;
  }>;
}

export const SurveyModel = mongoose.model<SurveySchema>('Survey', SurveySchema);
