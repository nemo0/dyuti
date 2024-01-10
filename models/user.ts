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
    onboarded: {
      type: Boolean,
      default: false,
    },
    businesses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Business",
      },
    ],
    clients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client",
      },
    ],
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  { timestamps: true }
);

export type IUser = InferSchemaType<typeof UserSchema>;

export const UserModel = models.User ?? model("User", UserSchema);
