import { InferSchemaType, Schema, model, models } from "mongoose";

const BusinessSchema = new Schema({
  businessName: {
    type: String,
    min: 3,
    max: 20,
    unique: true,
  },
  businessAddress: {
    type: String,
    min: 3,
    max: 20,
  },
  businessPhone: {
    type: String,
    max: 50,
    unique: true,
  },
  businessEmail: {
    type: String,
    max: 50,
    unique: true,
  },
  businessWebsite: {
    type: String,
    max: 50,
    unique: true,
  },
  businessOwner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export type IBusiness = InferSchemaType<typeof BusinessSchema>;

export const BusinessModel =
  models.Business ?? model("Business", BusinessSchema);
