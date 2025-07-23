import { Schema, Document, model, models, Types } from 'mongoose'

export interface IInterview extends Document {
    user: Types.ObjectId;
    type: string;
    role: string;
    level: string;
    techStack: string[];
    questions: string[];
    createdAt: Date;
}

const InterviewSchema = new Schema<IInterview>({
    user:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    role: { type: String, required: true },
    level: { type: String, required: true },
    techStack: { type: [String], required: true },
    questions: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now }
})

const Interview = models.InterviewPosition || model<IInterview>('Interview', InterviewSchema)
export default Interview;