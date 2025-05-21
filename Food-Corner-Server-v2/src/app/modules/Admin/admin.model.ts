import { model, Schema } from "mongoose";
import { IAdmin } from "./admin.interface";
import { adminGender } from "./admin.const";

// Define the IUserName interface as a Mongoose schema
const UserNameSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
  },
  { _id: false }
);

// Define the IAdmin interface as a Mongoose schema
export const adminSchema = new Schema<IAdmin>({
  id: {
    type: String,
    required: [true, "ID is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
  },
  name: {
    type: UserNameSchema,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  gender: {
    type: String,
    enum: {
      values: adminGender,
      message: "{VALUE} is not a valid gender",
    },
    required: [true, "Gender is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  photo: {
    type: String,
    required: [true, "Photo is required"],
  },
});

export const Admin = model<IAdmin>("Admin", adminSchema);
