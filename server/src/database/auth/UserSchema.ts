import mongoose, { Document, Schema } from 'mongoose';
import { UserRole } from '../../types/auth/UserRole';

// Define the User schema
const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  roles: {
    type: [String],
    enum: ['citizen', 'townCouncil', 'agency'],
    required: true,
  },
});

export interface UserModelSchema extends Document {
  email: string;
  roles: UserRole[];
}

export const UserModel = mongoose.model<UserModelSchema>('User', userSchema);
