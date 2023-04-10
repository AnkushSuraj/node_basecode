import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, require: true},
    email: { type: String, require: true, max: 50, unique: true },
    password: { type: String, require: true, min: 7 },
    isDeleted: { type: Boolean, default: false},
  },
  { timestamps: true }
);
const User = mongoose.model("users", UserSchema);
export default User;
