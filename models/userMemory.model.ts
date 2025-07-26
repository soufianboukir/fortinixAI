
import mongoose, { Schema, Document } from 'mongoose';

export interface IUserMemory extends Document {
  userId: string;
  memory: {
    key: string;
    value: string;
    updatedAt: Date;
  }[];
  preferences?: {
    language?: string;
    tone?: string;
    interests?: string[];
  };
}

const UserMemorySchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    memory: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
    preferences: {
      language: { type: String, default: 'en' },
      tone: { type: String, default: 'neutral' }, // e.g., 'friendly', 'formal'
      interests: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.models.UserMemory ||
  mongoose.model<IUserMemory>('UserMemory', UserMemorySchema);
