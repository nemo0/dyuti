import { Schema, InferSchemaType, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      min: 3,
      max: 20,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      max: 50,
      unique: true,
    },
  },
  { timestamps: true }
);

export type IUser = InferSchemaType<typeof UserSchema>;

export const UserModel = models.User ?? model("User", UserSchema);
