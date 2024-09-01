import mongoose, { Schema, Document, Model, mongo } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
}

const userSchema: Schema<User> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
      min: 10,
    },
  },
  { timestamps: true }
);

const userModel: Model<User> = mongoose.model<User>("Users", userSchema);

export default userModel;
