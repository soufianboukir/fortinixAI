import mongoose, { Document, models, Schema } from "mongoose";

export interface UserI extends Document {
  name: string;
  email: string;
  username: string;
  image: string;
}

const userSchema = new Schema<UserI>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    image: { type: String },
  },
  { timestamps: true },
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
