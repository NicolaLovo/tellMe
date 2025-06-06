import mongoose from 'mongoose';

const PrizeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    points: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

/**
 * Interface defining the Prize document shape in MongoDB
 */
export interface PrizeModelSchema extends Document {
  agencyId: string;
  title: string;
  creationDate: Date;
  points: number;
}

/**
 * Mongoose model for Prize collection based on the PrizeSchema
 */
export const PrizeModel = mongoose.model<PrizeModelSchema>(
  'Prize',
  PrizeSchema,
);
