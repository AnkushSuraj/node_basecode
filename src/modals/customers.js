import mongoose from "mongoose";
import { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    name: { type: String, require: true, default: null},
    email: { type: String, require: true, max: 50, unique: true, default: null },
    password: { type: String, require: true, min: 7, default: null },
    isDeleted: { type: Boolean, default: false},
    country_code: { type: String, require: true, default: null},
    phoneNumber: {type: Number, require:true, unique: true, default: 0},
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null},
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null},
    status: { type: Boolean, default: true},
    is_email_verified: { type: Boolean, default: false},
    is_phone_verified: { type: Boolean, default: false},
    createdAt: { type: Number, default: new Date().getTime() },
    updatedAt: { type: Number, default: new Date().getTime() }
  }
);
const Customer = mongoose.model("customers", customerSchema);
export default Customer;